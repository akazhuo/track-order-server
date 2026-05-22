<template>
  <div class="box">
    <div class="data-view">
      <div class="header"></div>
      <div class="content">
        <div class="content-block content-form">
          <el-form
            :model="formData"
            :rules="rules"
            label-width="80px"
            ref="formRef"
          >
            <!-- 纸张尺寸 -->
            <el-form-item label="纸张宽度">
              <div class="page-size">
                <el-input type="number" v-model="formData.width"></el-input>
                <!-- <span>x</span>
                <el-input type="number" v-model="formData.height"></el-input> -->
              </div>
            </el-form-item>
            <!-- 颜色选择 -->
            <el-form-item label="主题色">
              <el-color-picker v-model="formData.mainColor"></el-color-picker>
            </el-form-item>
            <!-- 标题1 -->
            <el-form-item label="标题1">
              <el-switch v-model="formData.title1.show"></el-switch>
            </el-form-item>
            <template v-if="formData.title1.show">
              <el-form-item label="文案" prop="title1.text">
                <el-input v-model="formData.title1.text"></el-input>
              </el-form-item>
              <el-form-item label="对齐">
                <el-radio-group v-model="formData.title1.align">
                  <el-radio value="left">左</el-radio>
                  <el-radio value="center">中</el-radio>
                  <el-radio value="right">右</el-radio>
                </el-radio-group>
              </el-form-item>
            </template>
            <!-- 标题2 -->
            <el-form-item label="标题2" prop="title2">
              <el-switch v-model="formData.title2.show"></el-switch>
            </el-form-item>
            <template v-if="formData.title2.show">
              <el-form-item label="文案" prop="title2.text">
                <el-input v-model="formData.title2.text"></el-input>
              </el-form-item>
              <!-- <el-form-item label="对齐">
                <el-radio-group v-model="formData.title2.align">
                  <el-radio value="left">左</el-radio>
                  <el-radio value="center">中</el-radio>
                  <el-radio value="right">右</el-radio>
                </el-radio-group>
              </el-form-item> -->
            </template>
            <el-form-item label="产品名称">
              <el-input v-model="formData.productName"></el-input>
            </el-form-item>
            <el-form-item label="规格描述">
              <el-input
                type="textarea"
                :rows="2"
                v-model="formData.productDesc"
              ></el-input>
            </el-form-item>
            <el-form-item label="生产厂家">
              <el-input v-model="formData.facName"></el-input>
            </el-form-item>
            <el-form-item label="生产地址" prop="addr">
              <el-input v-model="formData.facAddr"></el-input>
            </el-form-item>
            <el-form-item label="生产日期" prop="date">
              <el-date-picker
                v-model="formData.date"
                type="date"
                placeholder="选择日期"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(formRef)">
                打印
              </el-button>
              <el-button @click="resetForm(formRef)">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="content-block content-preview">
          <div
            class="preview-wrapper"
            :style="{
              width: formData.width + 'px',
              backgroundColor: formData.mainColor
            }"
          >
            <div class="wrapper-header">
              <div
                class="header-title"
                v-show="formData.title1.show"
                :style="{ textAlign: formData.title1.align }"
              >
                {{ formData.title1.text }}
              </div>
              <div class="header-desc" v-show="formData.title2.show">
                {{ formData.title2.text }}
              </div>
            </div>
            <div class="wrapper-content">
              <div class="content-title" :style="{ color: formData.mainColor }">
                产品合格证
              </div>
              <div class="content-detail">
                <div class="content-row">
                  <span class="row-label">产品名称：</span>
                  <span class="row-text">{{ formData.productName }}</span>
                </div>
                <div class="content-row">
                  <span class="row-label">规格描述：</span>
                  <span class="row-text">{{ formData.productDesc }}</span>
                </div>
                <div class="content-row">
                  <span class="row-label">生产厂家：</span>
                  <span class="row-text">{{ formData.facName }}</span>
                </div>
                <div class="content-row">
                  <span class="row-label">生产地址：</span>
                  <span class="row-text">{{ formData.facAddr }}</span>
                </div>
                <div class="content-row">
                  <span class="row-label">生产日期：</span>
                  <span class="row-text">{{ comShowDate }}</span>
                </div>
              </div>
              <div class="content-extra">
                <div class="extra-row quality-row">
                  <span class="row-label">质　　检：</span>
                  <span class="row-text"></span>
                </div>
                <div class="extra-row">
                  <span class="row-text"></span>
                </div>
                <div class="extra-row qrcode">
                  <div class="code-label">
                    <div class="scan-tips">
                      <p>微信扫一扫或</p>
                      <p>手机碰一碰打</p>
                      <p>开NFC溯源码</p>
                    </div>
                    <div class="after-sale-tips">
                      <p>执行标准见产品说明书</p>
                      <p>售后凭证勿撕</p>
                    </div>
                  </div>
                  <div class="arrow-left"></div>
                  <img class="code-img" src="" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

type Title = {
  show: Boolean
  text: String
  align: 'left' | 'center' | 'right'
}
interface Form {
  width: Number
  mainColor: String
  title1: Title
  title2: Title
  productName: String
  productDesc: String
  facName: String
  facAddr: String
  date: Date
}
const formData = reactive<Form>({
  width: 300,
  // height: 0,
  mainColor: '#2364a5',
  title1: {
    show: true,
    text: '标题1',
    align: 'center'
  },
  title2: {
    show: true,
    text: '标题2',
    align: 'center'
  },
  productName: '',
  productDesc: '',
  facName: '',
  facAddr: '',
  date: new Date()
})
const rules = reactive<FormRules<Form>>({
  // 'title1.text': [{ required: true, message: '请输入产品名称' }]
})
const formRef = ref<FormInstance>()

const comShowDate = computed(() => {
  if (!formData.date) {
    return ''
  }

  const yyyy = formData.date.getFullYear()
  const MM = String(formData.date.getMonth() + 1).padStart(2, '0')
  const dd = String(formData.date.getDate()).padStart(2, '0')

  return `${yyyy}-${MM}-${dd}`
})
async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  await formEl.validate((valid) => {})
}
function resetForm(formEl: FormInstance | undefined) {}
</script>

<style lang="scss" scoped>
$main-color: #2364a5;
.box .data-view {
  background: none;
  .content {
    display: flex;
    min-width: 1000px;
    max-width: 1400px;
    margin: 0 auto;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;

    .content-block {
    }
    .content-form {
      flex: 0 0 300px;
      padding: 30px 20px;
      background-color: #eee;

      .page-size {
        display: flex;

        .el-input {
          width: 100px;
        }
      }
    }
    .content-preview {
      flex: 1;
      display: flex;
      font-size: 14px;
      justify-content: center;

      .preview-wrapper {
        padding: 12px 0;
        box-sizing: border-box;
        background-color: $main-color;

        .wrapper-header {
          display: flex;
          margin: 0 22px;
          color: #fff;
          justify-content: center;

          .header-title {
            flex: 1;
            font-size: 40px;
            font-weight: 550;
            text-align: center;
          }

          .header-desc {
            width: 4em;
            margin-left: 6px;
            font-size: 14px;
          }
        }

        .wrapper-content {
          margin: 12px;
          padding: 8px;
          background-color: #fff;

          .content-title {
            margin-bottom: 12px;
            font-size: 26px;
            font-weight: 550;
            text-align: center;
            color: $main-color;
            letter-spacing: 4px;
          }

          .content-detail {
            .content-row {
              position: relative;
              .row-label {
                position: absolute;
                top: 0;
                transform: translateY(50%);
              }
              .row-text {
                display: block;
                min-height: 26px;
                margin-left: 70px;
                border-bottom: 1px solid #333;
                line-height: 26px;
              }

              & + .content-row {
                margin-top: 6px;
              }
            }
          }

          .content-extra {
            margin-top: 20px;

            .qrcode {
              display: flex;
              position: relative;
              margin-top: 20px;
              justify-content: space-between;
              align-items: center;

              .code-label {
                p {
                  margin: 2px 0;
                }
                .scan-tips p {
                  font-weight: 550;
                  letter-spacing: 4px;
                }

                .after-sale-tips {
                  margin-top: 12px;

                  p {
                    color: #666;
                    letter-spacing: 1px;
                    font-weight: 400;
                    font-size: 12px;
                  }
                }
              }

              .arrow-left {
                position: absolute;
                top: 50%;
                transform: translateY(-50%) translateX(-50%);
                left: 50%;
                border-top: 5px solid #fff;
                border-left: 10px solid #000;
                border-right: 0;
                border-bottom: 5px solid #fff;
              }

              .code-img {
                width: 120px;
                height: 120px;
                background-color: #eee;
              }
            }
          }
        }
      }
    }
  }
}
</style>
