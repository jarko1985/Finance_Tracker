"use client";
import { currencyFormatter } from "@/lib/utils";
import ExpenseCategoryItem from "./components/ExpenseCategoryItem";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState, useRef, useContext ,useEffect } from "react";
import Modal from "./components/Modal";
import { FaRegTrashAlt } from "react-icons/fa";
import { financeContext } from "@/lib/store/finance-context";
import AddExpensesModal from "./components/modals/AddExpensesModal";

ChartJS.register(ArcElement, Tooltip, Legend);



export default function Home() {
  const [showAddIcomeModal, setShowAddIcomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [balance,setBalance] = useState(0);
  const amountRef = useRef();
  const descriptionRef = useRef();
  const { addIncomeItem, income, removeIncomeItem,expenses } =
    useContext(financeContext);

    useEffect(() => {
      const newBalance =
        income.reduce((total, i) => {
          return total + i.amount;
        }, 0) -
        expenses.reduce((total, e) => {
          return total + e.total;
        }, 0);
  
      setBalance(newBalance);
    }, [expenses, income]);  

  const addIncomeHandler = async (event) => {
    event.preventDefault();
    const newIncome = {
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

    try {
      await addIncomeItem(newIncome);
      descriptionRef.current.value = "";
      amountRef.current.value = "";
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteIncomeEntryHandler = async (incomeId) => {
    try {
      await removeIncomeItem(incomeId);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Modal show={showAddIcomeModal} onClose={setShowAddIcomeModal}>
        <form onSubmit={addIncomeHandler} className="flex flex-col gap-4">
          <div className="input-group">
            <label htmlFor="amount">Income Amount</label>
            <input
              ref={amountRef}
              name="amount"
              type="number"
              min={0.01}
              step={0.01}
              placeholder="Enter income amount"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="description">Description</label>
            <input
              ref={descriptionRef}
              name="description"
              type="text"
              placeholder="Enter income description"
            />
          </div>
          <button type="submit" className="btn btn-primary self-start">
            Add entry
          </button>
          <div className="flex flex-col gap-4 mt-6">
            <h3 className="text-2xl font-bold">Income History</h3>

            {income.map((i) => {
              return (
                <div className="flex justify-between item-center" key={i.id}>
                  <div>
                    <p className="font-semibold">{i.description}</p>
                    <small className="text-xs">
                      {i.createdAt.toISOString()}
                    </small>
                  </div>
                  <p className="flex items-center gap-2">
                    {currencyFormatter(i.amount)}
                    <button
                      onClick={() => {
                        deleteIncomeEntryHandler(i.id);
                      }}
                    >
                      <FaRegTrashAlt />
                    </button>
                  </p>
                </div>
              );
            })}
          </div>
        </form>
      </Modal>
      <AddExpensesModal
        show={showAddExpenseModal}
        onClose={setShowAddExpenseModal}
      />
      <main className="container max-w-4xl mx-auto px-6">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
        </section>
        <section className="flex items-center gap-2 py-3">
          <button 
           onClick={() => {
            setShowAddExpenseModal(true);
          }}
          className="btn btn-primary z-0">+ Expenses</button>
          <button
            onClick={() => setShowAddIcomeModal(true)}
            className="btn btn-primary-outline"
          >
            + Income
          </button>
        </section>
        {/* Expenses: */}
        <section className="py-6">
          <h3 className="text-2xl pb-3">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {expenses &&
              expenses.map((expense) => (
                <ExpenseCategoryItem
                  key={expense.id}
                  color={expense.color}
                  title={expense.title}
                  total={expense.total}
                />
              ))}
          </div>
        </section>
        {/* Charts Section */}
        <section className="py-6">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: expenses.map((expense) => expense.total),
                    backgroundColor: expenses.map((expense) => expense.color),
                    borderColor: ["#18181b"],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
