# Migration `20200923220938`

This migration has been generated by Stephen Jensen at 9/23/2020, 5:09:38 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Bundle" ADD COLUMN "description" text   NOT NULL DEFAULT E''
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200909223713..20200923220938
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
@@ -18,15 +18,16 @@
   likes    User[]    @relation(name: "FeedUserLikes")
 }
 model Bundle {
-  id       Int         @id @default(autoincrement())
-  feeds    Feed[]
-  name     String
-  author   User?       @relation(name: "BundleAuthor", fields: [authorId], references: [id])
-  authorId Int?
-  tags     BundleTag[]
-  likes    User[]      @relation(name: "BundleUserLikes")
+  id          Int         @id @default(autoincrement())
+  feeds       Feed[]
+  name        String
+  description String      @default("")
+  author      User?       @relation(name: "BundleAuthor", fields: [authorId], references: [id])
+  authorId    Int?
+  tags        BundleTag[]
+  likes       User[]      @relation(name: "BundleUserLikes")
 }
 model User {
   id            Int            @id @default(autoincrement())
```

