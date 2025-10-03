<?php
// database/migrations/2025_10_03_XXXXXX_add_unique_to_uttt_reviews.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // 1) Dọn dữ liệu trùng (giữ lại bản mới nhất)
        // MySQL 8+: dùng CTE để xoá bản trùng lặp
        DB::statement("
            WITH ranked AS (
                SELECT id, user_id, product_id,
                       ROW_NUMBER() OVER (PARTITION BY user_id, product_id ORDER BY id DESC) AS rn
                FROM uttt_reviews
            )
            DELETE r FROM uttt_reviews r
            JOIN ranked x ON x.id = r.id
            WHERE x.rn > 1;
        ");

        // 2) Thêm unique composite
        Schema::table('uttt_reviews', function (Blueprint $t) {
            $t->unique(['user_id','product_id'], 'uttt_reviews_user_id_product_id_unique');
            // (khuyến nghị) index cho product_id để GET theo sản phẩm nhanh hơn
            $t->index('product_id', 'uttt_reviews_product_id_index');
        });
    }

    public function down(): void
    {
        Schema::table('uttt_reviews', function (Blueprint $t) {
            // drop theo tên để ổn định
            $t->dropUnique('uttt_reviews_user_id_product_id_unique');
            // (nếu bạn thêm index phụ ở up) thì drop luôn
            $t->dropIndex('uttt_reviews_product_id_index');
        });
    }
};
