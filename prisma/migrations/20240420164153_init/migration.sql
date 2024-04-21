/*
  Warnings:

  - You are about to drop the `Emotions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Emotions";

-- CreateTable
CREATE TABLE "ResponseData" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "participantId" TEXT NOT NULL,
    "surveyData" JSONB,
    "none" BOOLEAN NOT NULL DEFAULT false,
    "em01" SMALLINT,
    "em02" SMALLINT,
    "em03" SMALLINT,
    "em04" SMALLINT,
    "em05" SMALLINT,
    "em06" SMALLINT,
    "em07" SMALLINT,
    "em08" SMALLINT,
    "em09" SMALLINT,
    "em10" SMALLINT,
    "em11" SMALLINT,
    "em12" SMALLINT,
    "em13" SMALLINT,
    "em14" SMALLINT,
    "em15" SMALLINT,
    "em16" SMALLINT,
    "em17" SMALLINT,
    "em18" SMALLINT,
    "em19" SMALLINT,
    "em20" SMALLINT,
    "other" JSONB,

    CONSTRAINT "ResponseData_pkey" PRIMARY KEY ("id")
);
