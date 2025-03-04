-- CreateTable
CREATE TABLE "promotion_medias" (
    "promotion_id" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,

    CONSTRAINT "promotion_medias_pkey" PRIMARY KEY ("promotion_id","media_id")
);

-- CreateTable
CREATE TABLE "promotions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "promotion_medias_promotion_id_key" ON "promotion_medias"("promotion_id");

-- AddForeignKey
ALTER TABLE "promotion_medias" ADD CONSTRAINT "promotion_medias_promotion_id_fkey" FOREIGN KEY ("promotion_id") REFERENCES "promotions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_medias" ADD CONSTRAINT "promotion_medias_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
