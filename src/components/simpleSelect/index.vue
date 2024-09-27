<template>
  <div>
    <!-- v-model="value"  :value="value"-->
    <select v-model="lvalue" @change="onSelect" class="selectstyle">
      <option value="-1" style="display: none">{{ splaceholder }}</option>
      <option
        class="optionsitem"
        v-for="(item, index) in selectArr"
        :key="index"
        :value="item.value"
      >
        <!-- {{ item }} -->
        {{ item.unitname || "9号鹿舍" }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      //动态key值 取数组对象的value值
      type: [String, Number],
      default: "-1",
    },
    splaceholder: {
      type: String,
      default: "请选择",
    },
    datalist: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      selectArr: [],
      lvalue: "",
    };
  },
  watch: {
    datalist: {
      deep: true,
      handler: function (val) {
        this.selectArr = val;
      },
    },
    value: {
      deep: true,
      handler: function (val) {
        this.lvalue = val;
      },
    },
  },
  mounted() {
    this.selectArr = this.datalist;
    this.lvalue = this.value;
    // console.log(this.value);
  },
  methods: {
    onSelect(event) {
      const data = this.selectArr.find(
        (item) => item.value == event.target.value
      );
      console.log(event.target.value, this.selectArr, data);
      // this.$emit("input", event.target.value);
      this.$emit("input", data.id);
      // this.$emit("onSelect",this.selectArr[ event.target.value]);
      this.$emit("onSelect", data.id);
    },
  },
};
</script>

<style lang="less" scoped>
.selectstyle {
  width: auto;
  // min-width: 100px;
  width: 100px;
  height: 30px;
  background-color: #173e7f;
  color: white;
  border: 1px #57c3fb solid;
  font-size: calc(100vw * 16 / 1920);
  text-align: left;
  padding-left: 10px;
  border-radius: 0;

  .optionsitem {
    background: #173e7f;
    color: white;
    line-height: 20px;
  }
}
.optionsitem:hover {
  background-color: #57c3fb;
}
</style>
