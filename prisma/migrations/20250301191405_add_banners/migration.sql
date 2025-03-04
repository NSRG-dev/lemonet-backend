-- CreateTable
CREATE TABLE "banner_medias" (
    "banner_id" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,

    CONSTRAINT "banner_medias_pkey" PRIMARY KEY ("banner_id","media_id")
);

-- CreateTable
CREATE TABLE "banners" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "banner_medias_banner_id_key" ON "banner_medias"("banner_id");

-- AddForeignKey
ALTER TABLE "banner_medias" ADD CONSTRAINT "banner_medias_banner_id_fkey" FOREIGN KEY ("banner_id") REFERENCES "banners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banner_medias" ADD CONSTRAINT "banner_medias_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
