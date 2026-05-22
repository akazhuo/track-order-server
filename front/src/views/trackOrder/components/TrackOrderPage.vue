<template>
  <div id="track-order-page">
    <!-- 轮播图 -->
    <el-carousel class="banner" height="190px" indicator-position="none">
      <el-carousel-item
        v-for="item in formData!.banner"
        :key="item"
        style="background: #eee"
      >
        <el-image fit="scale-down" :src="item"></el-image>
      </el-carousel-item>
    </el-carousel>
    <!-- 品牌图 -->
    <el-image class="brand-img" fit="scale-down" :src="formData!.brandImg">
      <template #error>
        <div class="img-error">品牌图</div>
      </template>
    </el-image>
    <!-- 商品信息 -->
    <div class="info-panel product-info">
      <div class="panel-title">商品信息</div>
      <div class="panel-content">
        <table class="info-table">
          <tbody>
            <tr v-for="(item, index) in tableRowKeys" :key="index">
              <td v-html="item.label" class="table-label"></td>
              <td class="table-content"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 质检图 -->
    <div class="info-panel quality-inspection">
      <div class="panel-title">质检图</div>
      <div class="panel-content">
        <el-image class="qi-img" fit="scale-down" v-for="i in 5">
          <template #error>
            <div class="img-error">质检图</div>
          </template>
        </el-image>
      </div>
    </div>
    <!-- 品牌介绍 -->
    <div class="info-panel brand-desc">
      <div class="panel-title">品牌介绍</div>
      <div class="panel-content">
        <video class="desc-video" src="" controls preload="auto"></video>
        <div class="desc-img-list">
          <el-image class="desc-img" fit="scale-down" v-for="i in 5">
            <template #error>
              <div class="img-error">介绍图</div>
            </template>
          </el-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormData } from '@/types/trackOrderPage'
import { inject, onUpdated } from 'vue'
import tableRowKeys from './row'

const formData = inject<FormData>('formData')
</script>

<style lang="scss" scoped>
#track-order-page {
  width: 100%;
  background-color: #fff;

  .img-error {
    display: flex;
    font-size: 14px;
    color: #c0c4cc;
    justify-content: center;
    align-items: center;
  }

  .banner {
    background-color: #eee;

    .el-image {
      height: 100%;
      width: 100%;
    }
  }

  .brand-img {
    width: 100%;

    .img-error {
      height: 66px;
    }
  }

  .info-panel {
    margin: 0 14px;
    .panel-title {
      font-size: 16px;
      font-weight: bold;
      margin: 20px 0;
    }
  }

  .product-info {
    .info-table {
      width: 100%;
      border: 1px solid #e2e2e2;
      border-bottom: 0;

      tr td {
        padding: 5px 10px;
      }

      .table-label {
        width: 100px;
        text-align: center;
        border-right: 1px solid #e2e2e2;
        border-bottom: 1px solid #e2e2e2;
        color: #999;
      }

      .table-content {
        border-bottom: 1px solid #e2e2e2;
      }
    }
  }

  .quality-inspection {
    .qi-img {
      width: 100%;

      .img-error {
        height: 100px;
        background-color: #eee;
      }
    }
  }

  .brand-desc {
    font-size: 0;

    .desc-video {
      width: 100%;
    }

    .desc-img-list {
      margin-top: 1rem;
    }

    .desc-img {
      width: 100%;
      .img-error {
        height: 200px;
        background-color: #eee;
      }
    }
  }
}
</style>
