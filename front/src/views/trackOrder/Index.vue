<template>
  <div class="box">
    <div class="data-view">
      <div class="header"></div>
      <div class="content">
        <div class="content-form">
          <el-form
            :model="formData"
            :rules="rules"
            label-width="100px"
            ref="formRef"
          >
            <h5>商品信息</h5>
            <el-form-item label="商品名称">
              <el-select v-model="formData.product">
                <el-option
                  v-for="(item, index) in products"
                  :key="index"
                  :value="item._id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-for="(row, rowIndex) in tableRowKeys"
              :label="row.label"
              :key="rowIndex"
            >
              <template #default>
                <div class="brand-filter-row" v-if="row.key === 'brand'">
                  <el-input
                    v-model="formData.brand"
                    placeholder="输入品牌名"
                  ></el-input>
                  <el-button @click="searchProductBrand">搜索</el-button>
                </div>
                <el-input
                  v-else
                  disabled
                  :placeholder="row.label"
                  :value="productData[row.key]"
                ></el-input>
              </template>
            </el-form-item>
            <!-- <el-form-item label="客户名称">
              <el-input
                placeholder="客户名称"
                :value="productData.customer"
              ></el-input>
            </el-form-item>
            <el-form-item label="客户单号">
              <el-input placeholder="客户单号"></el-input>
            </el-form-item>
            <el-form-item label="产品编号">
              <el-input placeholder="产品编号"></el-input>
            </el-form-item>
            <el-form-item label="规&#12288;&#12288;格">
              <el-input placeholder="规格"></el-input>
            </el-form-item>
            <el-form-item label="等&#12288;&#12288;级">
              <el-input placeholder="等级"></el-input>
            </el-form-item>
            <el-form-item label="生产批次">
              <el-input placeholder="生产批次"></el-input>
            </el-form-item>
            <el-form-item label="生产日期">
              <el-input placeholder="生产日期"></el-input>
            </el-form-item>
            <el-form-item label="生产企业">
              <el-input placeholder="生产企业"></el-input>
            </el-form-item>
            <el-form-item label="产&#12288;&#12288;地">
              <el-input placeholder="产地"></el-input>
            </el-form-item>
            <el-form-item label="面料批号">
              <el-input placeholder="面料批号"></el-input>
            </el-form-item>
            <el-form-item label="面料供应商">
              <el-input placeholder="面料供应商"></el-input>
            </el-form-item>
            <el-form-item label="质检状态">
              <el-input placeholder="质检状态"></el-input>
            </el-form-item>
            <el-form-item label="质 检 员">
              <el-input placeholder="质检员"></el-input>
            </el-form-item> -->
            <h5>品牌介绍</h5>
            <el-form-item label="轮播图">
              <el-upload
                action="#"
                list-type="picture-card"
                :before-upload="handleUploadBanner"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="品牌图">
              <el-upload
                action="#"
                :limit="1"
                list-type="picture-card"
                :before-upload="handleUploadBrand"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="介绍视频">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="介绍图">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-form>
          <div>
            <el-button type="primary" @click="submitForm(formRef)">
              提 交
            </el-button>
            <el-button>重 置</el-button>
          </div>
        </div>
        <div class="content-preview">
          <el-scrollbar class="preview-content">
            <track-order-page></track-order-page>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, provide, onMounted } from 'vue'
import type { FormInstance, FormRules, UploadFile } from 'element-plus'
import type { Product, FormData } from '@/types/trackOrderPage'
import TrackOrderPage from './components/TrackOrderPage.vue'
import tableRowKeys from './components/row'
import { getProduct, searchBrand } from '@/api/trackOrder'

const products = ref<Product[]>([])
const formData = reactive<FormData>({
  product: '',
  brand: '',
  banner: [],
  brandImg: ''
})
const productData = computed(() => {
  return products.value.find((i) => i._id === formData.product) || {}
})
const rules = reactive<FormRules<FormData>>({
  // 'title1.text': [{ required: true, message: '请输入产品名称' }]
})
const formRef = ref<FormInstance>()

async function submitForm(formInstance: FormInstance | undefined) {}
async function handleUploadBanner(file: UploadFile[]) {
  formData.banner.push(file.path)
  return false
}
async function handleUploadBrand(file: UploadFile) {
  formData.brandImg = file.path
  return false
}

// 请求商品列表
async function requestProductList() {
  const res = await getProduct()
  console.log(res)
  products.value = res
}
//
async function searchProductBrand() {
  searchBrand({ name: formData.brand })
}

onMounted(() => {
  requestProductList()
})

provide('formData', formData)
</script>

<style lang="scss" scoped>
.main .box .data-view {
  background: none;
  max-width: 1400px;
  margin: 0 auto;

  .el-select {
    width: 200px;
  }

  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;

    .content-form,
    .content-preview {
      flex-shrink: 0;
      border-radius: 6px;
      overflow: hidden;
    }

    .content-form {
      padding: 0 12px;
      background-color: #fff;
    }

    .content-preview {
      flex-grow: 1;
      position: sticky;
      top: 20px;
      margin-left: 80px;
      .preview-content {
        height: calc(100vh - 126px);
        width: 390px;
        margin: 0 auto;
        border: 1px solid #eee;
      }
    }
  }

  :deep(.brand-filter-row) {
    .el-input {
      width: 132px;
    }
    .el-button {
      margin-left: 8px;
    }
  }
}
</style>
