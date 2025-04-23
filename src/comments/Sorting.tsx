import { useState } from "react";
import { useCommentsContext } from "./commentsContext";
import { initialOrderByButtons } from "./initialData";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import OrderByButton from "../interfaces/orderByButton";

import './css/Sorting.css';

function Sorting() {
  const { orderBy, setOrderBy } = useCommentsContext();
  const [orderByButtons, setOrderByButtons] = useState<OrderByButton[]>(initialOrderByButtons);

  const handleOrderButtonClick = (btn: OrderByButton) => {
    const updatedButtons = orderByButtons.map((b) => {
      if (b.name === btn.name) {
        const newDescending = !b.isDescending;

        setOrderBy(() => newDescending ? b.order[1] : b.order[0]);

        return {
          ...b,
          isDescending: newDescending
        };
      }

      return {
        ...b,
        isDescending: b.name !== "Date"
      };
    });

    setOrderByButtons(updatedButtons);
  }

  const buttons = orderByButtons.map((btn) => {
    const chevron = btn.isDescending
      ? <AiOutlineSortDescending size="1.25rem" />
      : <AiOutlineSortAscending size="1.25rem" />;

    let className = `sorting-btn`;
    if (btn.order.includes(orderBy)) {
      className += " active";
    }

    return (
      <button
        key={btn.name}
        className={className}
        onClick={() => handleOrderButtonClick(btn)}
      >
        {btn.name}
        {btn.order.includes(orderBy) && chevron}
      </button >
    )
  })

  return (
    <section className="sorting-container">
      {buttons}
    </section>
  );
}

export default Sorting;
