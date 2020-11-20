import { DateTime } from "luxon";

const Ticket = {
  data: () => ({
    ticket: {},
    dateObj: {},
  }),
  watch: {
    ticket(newValue) {
      this.dateObj = DateTime.fromISO(newValue.date);
    },
  },
  created() {
    this.dateObj = DateTime.local();
  },
  computed: {
    vendor() {
      return this.ticket.vendor || {};
    },
    time() {
      return this.dateObj.toLocaleString(DateTime.TIME_SIMPLE);
    },
    date() {
      return this.dateObj.toLocaleString(DateTime.DATE_FULL);
    },
    dayName() {
      return this.dateObj.toFormat("cccc");
    },
    price() {
      return (this.ticket.price / 100).toFixed(2);
    },
  },
};

export default Ticket;
