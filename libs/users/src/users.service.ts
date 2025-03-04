import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserCreateDto } from './dto/user-create.dto';
import { I18nService } from 'nestjs-i18n';
import { PasswordService } from '@app/password';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { UserSearchDto } from './dto/user.search.dto';
import { User } from '@app/common';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordService: PasswordService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async search(dto: UserSearchDto) {
    const [users, count] = await Promise.all([
      this.usersRepository.search(dto),
      this.usersRepository.count(dto),
    ]);
    return { data: users.map(this.removePassword), count };
  }

  async create(dto: UserCreateDto) {
    await Promise.all([
      this.ensureExistsByEmail(dto.email),
      this.ensureExistsByUsername(dto.username),
    ]);

    const hashedPassword = await this.passwordService.hashPassword(
      dto.password,
    );
    const user = await this.usersRepository.create({
      ...dto,
      password: hashedPassword,
    });
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(this.i18n.t('errors.user.notFound'));
    }
    return user;
  }

  async findOneById(id: string) {
    const cachedUser = await this.cacheManager.get(`user:${id}`);
    if (cachedUser) {
      this.logger.log(`User ${id} found in cache`);
      return cachedUser;
    }

    const user = await this.usersRepository.findOneById(id);
    if (!user) {
      this.logger.warn(`User ${id} not found`);
      throw new NotFoundException(this.i18n.t('errors.user.notFound'));
    }

    this.logger.log(`User ${id} found in db, setting to cache`);
    await this.cacheManager.set(`user:${id}`, user, 1000 * 60);
    return user;
  }

  async delete(id: string) {
    await this.ensureExistsById(id);
    const user = await this.usersRepository.delete(id);
    await this.cacheManager.del(`user:${id}`);
    return this.removePassword(user);
  }

  async ensureExistsById(id: string) {
    const exists = await this.usersRepository.existsById(id);
    if (!exists) {
      throw new NotFoundException(this.i18n.t('errors.user.notFound'));
    }
  }

  async ensureExistsByUsername(username: string) {
    const exists = await this.usersRepository.existsByUsername(username);
    if (exists) {
      throw new ConflictException(
        this.i18n.translate('errors.user.alreadyExistsUsername'),
      );
    }
  }
  async ensureExistsByEmail(email: string) {
    const exists = await this.usersRepository.existsByEmail(email);
    if (exists) {
      throw new ConflictException(
        this.i18n.translate('errors.user.alreadyExistsEmail'),
      );
    }
  }

  private removePassword(user: User) {
    delete user.password;
    return user;
  }
}
