<template>
  <div class="table-box msg-table" v-loading="loading">
    <el-table
      :data="tableData"
      style="width: 100%"
      ref="multipleTable"
      id="multipleTable"
      :height="tableHeight"
      :header-row-style="{ height: '40px', background: '#f1f6ff' }"
      :header-cell-style="{ background: 'transparent', padding: '8px 0', fontWeight: '600', fontSize: '14px', color: '#333333' }"
      :cell-style="{ padding: '0', height: '40px', fontSize: '14px', color: '#333333' }"
    >
      <template slot="empty">
        <el-button v-if="loading" type="text" :loading="true">加载中</el-button>
        <div v-else class="empty-box">
          <span>暂无数据</span>
        </div>
      </template>
      <el-table-column prop="date" label="栏目" width="100">
        <template slot-scope="scope">
          <div class="cell-box">
            <div class="tag">
              <div class="jiao1"></div>
              <div class="jiao2"></div>
              {{ scope.row.columnname }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="subject" label="标题" width="360">
        <template slot-scope="scope">
          <Tooltip :message="scope.row.subject" @tooltipClick="clickToolTip(scope.row.articleid)"></Tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="热度" width="100">
        <template slot-scope="scope">
          <img v-if="scope.row.label" :src="imgMethod(scope.row.label)" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="点击/跟帖" width="100">
        <template slot-scope="scope"> {{ scope.row.clicknum || 0 }}/{{ scope.row.reviewnum || 0 }} </template>
      </el-table-column>
      <el-table-column prop="authorNamenew" label="发布人" fit show-overflow-tooltip> </el-table-column>
      <el-table-column prop="compNameNew" label="作者单位" fit show-overflow-tooltip> </el-table-column>
      <el-table-column prop="publisheddate" label="日期" fit show-overflow-tooltip> </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 50, 100, 200]"
      :current-page="filters.currentPage"
      :page-size="filters.rowCount"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  components: {
    Tooltip: () => import("./tooltip.vue"),
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    filters: {
      type: Object,
      default: () => {
        return { currentPage: 1, rowCount: 10 };
      },
    },
    total: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      observer: null,
      tableHeight: 507,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initObserver();
    });
  },
  methods: {
    initObserver() {
      const config = {
        attributes: true,
      };
      const element = document.getElementById("multipleTable");

      const observer = new ResizeObserver((entries) => {
        if (element.clientHeight && this.tableHeight != element.clientHeight) {
          this.tableHeight = element.clientHeight;
        }
      });

      observer.observe(element, config);
      this.observer = observer;
    },
    clickToolTip(val) {
      this.$router.push({
        name: "msgView",
        query: {
          articleid: val,
        },
      });
    },

    handleSizeChange(val) {
        this.filters.rowCount = val;
        this.filters.currentPage = 1;
        this.getArticles();
        // //or this.$emit("sizeChange", val);
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.filters.currentPage = val;
        this.getArticles();
        // //or this.$emit("currentChange", val);
    },
    getArticles() {},
    imgMethod(val) {
      switch (val) {
        case "hot":
          return require("@/assets/images/msgList/fire.png");
        case "res":
          return require("@/assets/images/msgList/good.png");
        case "new":
          return require("@/assets/images/msgList/new.png");

        default:
          return "";
      }
    },
    scrollTop() {
      this.$refs.multipleTable.bodyWrapper.scrollTop = 0;
    },
  },
  beforeDestroy() {
    if (this.observer) this.observer.disconnect();
  },
};
</script>
<style lang="scss" scoped>
.table-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;

  .el-table {
    flex: 1;
  }

  .cell-box {
    display: flex;
  }

  .tag {
    padding: 3px 11px 3px 8px;
    box-sizing: border-box;
    font-family: PingFang SC, PingFang SC;
    font-weight: 500;
    font-size: 10px;
    color: #ffffff;
    background: #3784ff;
    border-radius: 3px;
    position: relative;
    display: flex;
    align-items: center;
  }

  .jiao1 {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 0;
    height: 0;
    border: 4px solid transparent;
    border-top-color: #fff;
    border-right-color: #fff;
  }

  .jiao2 {
    position: absolute;
    bottom: 0;
    right: 0;
    display: block;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-right-color: #fff;
    border-bottom-color: #fff;
  }

  .pagination {
    padding: 60px 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
