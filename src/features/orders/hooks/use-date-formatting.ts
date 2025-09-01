export const useDateFormatting = () => {
  const formatDate = (
    dateString: string | undefined,
    fallback: string = ""
  ) => {
    if (!dateString) return fallback;
    try {
      return new Date(dateString).toLocaleDateString("uk-UA");
    } catch {
      return fallback;
    }
  };

  const formatDateTime = (
    dateString: string | undefined,
    fallback: string = ""
  ) => {
    if (!dateString) return fallback;
    try {
      return new Date(dateString).toLocaleString("uk-UA");
    } catch {
      return fallback;
    }
  };

  const formatMockDate = (
    dateString: string | undefined,
    fallback: string = ""
  ) => {
    if (!dateString) return fallback;
    // Для моков возвращаем фиксированные даты как на изображении
    if (fallback === "15/08/2017") return "15/08/2017";
    if (fallback === "15/10/2017") return "15/10/2017";
    return formatDate(dateString, fallback);
  };

  return {
    formatDate,
    formatDateTime,
    formatMockDate,
  };
};
