<!-- 日历组件 -->
<style lang='scss' scoped>
$backColor: #f2f8fe;
$borderColor: #f1f1f1;
.h-calendar-warpper {
  width: 100%;
}
.h-calendar-table {
  width: 100%;
  border: 1px solid $borderColor;
  border-collapse: collapse;
}
.h-calendar-header td {
  padding: 12px 0;
  text-align: center;
}
.h-calendar-cell {
  box-sizing: border-box;
  border: 1px solid $borderColor;
  padding: 8px;
  height: 85px;
  cursor: pointer;
  div {
    height: 100%;
  }
  &:hover {
    background: $backColor;
  }
}

.oth-month {
  color: #c0c4cc;
}
.cur-month {
  color: #333;
}

.is-selected {
  background: $backColor;
  color: #1989fa;
}

.is-today {
  color: #1989fa;
}
</style>
<template>
  <div>
    <div class="h-calendar-warpper">
      <table class="h-calendar-table">
        <thead class="h-calendar-header">
          <td>日</td>
          <td>一</td>
          <td>二</td>
          <td>三</td>
          <td>四</td>
          <td>五</td>
          <td>六</td>
        </thead>
        <tr class="h-calendar-row" v-for="(week, index) of calendarData" :key="index">
          <td
            class="h-calendar-cell"
            v-for="(date, index) of week"
            :key="index"
            :class="{ 'cur-month': date.type === 'cur', 'oth-month': date.type !== 'cur', 'is-selected': date === selectedDate }"
            @click="selectDate(date)"
          >
            <div>{{ date.val }}</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curDate: '',
      calendarData: [],
      selectedDate: {}
    };
  },
  props: {
    date: {
      type: Date,
      default: function (val) {
        return val || new Date();
      }
    }
  },
  methods: {
    initCaledar() {
      try {
        this.curDate = new Date(this.date);
      } catch (e) {
        console.log(e);
      }
      this.generateCalendarData();
    },
    generateCalendarData() {
      const curDate = this.curDate;
      // 当前日是周几，应该排在第几行
      const curDay = this.curDate.getDay();
      const rowIndex = Math.ceil((this.curDate.getDate() - curDay) / 7);
      let singRow = [],
        lastCellDate;
      const curMonthLastDate = this.getMonthLastDay(this.curDate.getMonth());
      const lastMonthLastDate = this.getMonthLastDay(this.curDate.getMonth() - 1);
      // 先将当前行处理完
      singRow = this.parseCurdateRow(curDay, curDate.getDate(), curDate.getMonth(), curMonthLastDate);
      this.calendarData[rowIndex] = singRow;
      // < rowIndex, --计算
      let prevRowIndex = rowIndex - 1;
      while (prevRowIndex >= 0) {
        lastCellDate = singRow.slice(0)[0];
        singRow = [];
        for (let i = 1; i <= 7; i++) {
          singRow.push({
            type: lastCellDate.type !== 'cur' ? 'prev' : lastCellDate.val - i > 0 ? 'cur' : 'prev',
            val: lastCellDate.val - i  > 0 ? lastCellDate.val - i : lastCellDate.val - i + lastMonthLastDate
          });
        }
        this.calendarData[prevRowIndex] = singRow.reverse();
        prevRowIndex--;
      }

      // > rowIndex, ++计算
      let nextRowIndex = rowIndex + 1;
      singRow = this.calendarData[rowIndex];
      while (nextRowIndex < 6) {
        lastCellDate = singRow.slice(-1)[0];
        singRow = [];
        for (let i = 1; i <= 7; i++) {
          singRow.push({
            type: lastCellDate.type !== 'cur' ? 'next' : lastCellDate.val + i <= curMonthLastDate ? 'cur' : 'next',
            val: lastCellDate.val + i <= curMonthLastDate? lastCellDate.val + i : lastCellDate.val + i - curMonthLastDate 
          });
        }
        this.calendarData[nextRowIndex] = singRow;
        nextRowIndex++;
      }
    },
    parseCurdateRow(curDay, curDate, curMonth, curMonthLastDate) {
      const weekRow = [];
      weekRow[curDay] = {
        type: 'cur',
        val: curDate
      };
      if (curDay === 0) {
        for (let i = 1; i < 7; i++) {
          weekRow[i] = {
            type: curDate + i <= curMonthLastDate ? 'cur' : 'next',
            val: curDate + i <= curMonthLastDate ? curDate + i : curDate + i - curMonthLastDate
          };
        }
      } else {
        const lastMonthLastDay = this.getMonthLastDay(curMonth - 1);
        // 处理curDate前面
        for (let i = curDay - 1, j = 1; i >= 0; i--, j++) {
          weekRow[i] = {
            type: curDate - j < 1 ? 'prev' : 'cur',
            val: curDate - j < 1 ? lastMonthLastDay + curDate - j : curDate - j
          };
        }
        // 处理curDate后面
        for (let i = curDay + 1; i < 7; i++) {
          weekRow[i] = {
            type: curDate + i <= curMonthLastDate ? 'cur' : 'next',
            val: curDate + i <= curMonthLastDate ? curDate + i : curDate + i - curMonthLastDate
          };
        }
      }
      return weekRow;
    },
    getMonthLastDay(month) {
      return new Date(2020, month + 1, 0).getDate();
    },
    selectDate(date) {
      this.selectedDate = date;
    }
  },
  created() {
    this.initCaledar();
  }
};
</script>
