# Migration `20201020041735`

This migration has been generated by Stephen Jensen at 10/19/2020, 11:17:35 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."SavedArticle" DROP COLUMN "url",
ADD COLUMN "contents" jsonb   NOT NULL 
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201020041607..20201020041735
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgres"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -44,9 +44,9 @@
 model SavedArticle {
   id       Int   @id @default(autoincrement())
   author   User? @relation(fields: [authorId], references: [id])
-  contents Json?
+  contents Json
   authorId Int?
 }
 model BundleTag {
```

