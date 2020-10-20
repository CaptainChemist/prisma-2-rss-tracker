# Migration `20201020135906`

This migration has been generated by Stephen Jensen at 10/20/2020, 8:59:06 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."SavedArticle" ADD COLUMN "feedId" integer   NOT NULL 

ALTER TABLE "public"."SavedArticle" ADD FOREIGN KEY ("feedId")REFERENCES "public"."Feed"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201020045908..20201020135906
--- datamodel.dml
+++ datamodel.dml
@@ -1,22 +1,23 @@
 datasource db {
   provider = "postgres"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model Feed {
-  id       Int       @id @default(autoincrement())
-  name     String
-  url      String    @unique
-  bundles  Bundle[]
-  author   User?     @relation(name: "FeedAuthor", fields: [authorId], references: [id])
-  authorId Int?
-  tags     FeedTag[]
-  likes    User[]    @relation(name: "FeedUserLikes")
+  id            Int            @id @default(autoincrement())
+  name          String
+  url           String         @unique
+  bundles       Bundle[]
+  author        User?          @relation(name: "FeedAuthor", fields: [authorId], references: [id])
+  authorId      Int?
+  tags          FeedTag[]
+  likes         User[]         @relation(name: "FeedUserLikes")
+  savedArticles SavedArticle[]
 }
 model Bundle {
   id          Int         @id @default(autoincrement())
@@ -46,9 +47,11 @@
   id       Int    @id @default(autoincrement())
   author   User?  @relation(fields: [authorId], references: [id])
   contents Json
   url      String @unique
+  feed     Feed   @relation(fields: [feedId], references: [id])
   authorId Int?
+  feedId   Int
 }
 model BundleTag {
   id      Int      @id @default(autoincrement())
```

