export enum PermissionEnum {
  PermissionSearch = 'permission:search',
  PermissionGet = 'permission:get',

  RoleCreate = 'role:create',
  RoleGet = 'role:get',
  RoleUpdate = 'role:update',
  RoleSearch = 'role:search',
  RoleDelete = 'role:delete',

  UserCreate = 'user:create',
  UserGet = 'user:get',
  UserUpdate = 'user:update',
  UserDelete = 'user:delete',
  UserBan = 'user:ban',
  UserSearch = 'user:search',

  MessageCreate = 'message:create',
  MessageGet = 'message:get',
  MessageUpdate = 'message:update',
  MessageDelete = 'message:delete',
  MessageSearch = 'message:search',

  BannerCreate = 'banner:create',
  BannerGet = 'banner:get',
  BannerUpdate = 'banner:update',
  BannerDelete = 'banner:delete',
  BannerSearch = 'banner:search',

  FaqCreate = 'faq:create',
  FaqGet = 'faq:get',
  FaqUpdate = 'faq:update',
  FaqDelete = 'faq:delete',
  FaqSearch = 'faq:search',
}

export const PermissionTitles: Record<PermissionEnum, string> = {
  [PermissionEnum.PermissionSearch]: 'Поиск разрешений',
  [PermissionEnum.PermissionGet]: 'Получение разрешений',

  [PermissionEnum.RoleCreate]: 'Создание ролей',
  [PermissionEnum.RoleGet]: 'Получение ролей',
  [PermissionEnum.RoleUpdate]: 'Обновление ролей',
  [PermissionEnum.RoleSearch]: 'Поиск ролей',
  [PermissionEnum.RoleDelete]: 'Удаление ролей',

  [PermissionEnum.UserCreate]: 'Создание пользователя',
  [PermissionEnum.UserGet]: 'Получение пользователя',
  [PermissionEnum.UserUpdate]: 'Обновление пользователя',
  [PermissionEnum.UserDelete]: 'Удаление пользователя',
  [PermissionEnum.UserBan]: 'Бан пользователя',
  [PermissionEnum.UserSearch]: 'Поиск пользователей',

  [PermissionEnum.MessageCreate]: 'Создание сообщения',
  [PermissionEnum.MessageGet]: 'Получение сообщения',
  [PermissionEnum.MessageUpdate]: 'Обновление сообщения',
  [PermissionEnum.MessageDelete]: 'Удаление сообщения',
  [PermissionEnum.MessageSearch]: 'Поиск сообщений',

  [PermissionEnum.BannerCreate]: 'Создание баннера',
  [PermissionEnum.BannerGet]: 'Получение баннера',
  [PermissionEnum.BannerUpdate]: 'Обновление баннера',
  [PermissionEnum.BannerDelete]: 'Удаление баннера',
  [PermissionEnum.BannerSearch]: 'Поиск баннеров',

  [PermissionEnum.FaqCreate]: 'Создание FAQ',
  [PermissionEnum.FaqGet]: 'Получение FAQ',
  [PermissionEnum.FaqUpdate]: 'Обновление FAQ',
  [PermissionEnum.FaqDelete]: 'Удаление FAQ',
  [PermissionEnum.FaqSearch]: 'Поиск FAQ',
};
