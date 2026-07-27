import formatDate from "../../utils/formatDate";

function shouldShowDivider(messages, index) {
  if (index === 0) return true;

  const current = formatDate(messages[index].createdAt);
  const previous = formatDate(messages[index - 1].createdAt);

  return previous.setHours(0, 0, 0, 0) < current.setHours(0, 0, 0, 0);
}

export default shouldShowDivider;
