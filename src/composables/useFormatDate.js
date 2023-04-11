import moment from "moment";

export default function useFormatDate() {
  const formatDateDMY = (date) => {
    return moment(date).utc().format("DD/MM/YYYY");
  };
  const formatDateDMYH = (date) => {
    return moment(date).format("DD/MM/YYYY hh:mm A");
  };

  return { formatDateDMY, formatDateDMYH };
}
