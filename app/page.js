"use client";

import { currencyFormater } from "@/lib/utils";
import ExpenseCategoryItem from "./components/ExpenseCategoryItem";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState, useRef } from "react";
import Modal from "./components/Modal";
import { db } from "lib/firebase";
import { collection, addDoc } from "firebase/firestore";
ChartJS.register(ArcElement, Tooltip, Legend);

const DUMMY_DATA = [
  {
    id: 1,
    title: "Entertainment",
    color: "#18cc48",
    total: 500,
  },
  {
    id: 2,
    title: "Gass",
    color: "#c4bf1a",
    total: 600,
  },
  {
    id: 3,
    title: "Fuel",
    color: "#c41a1a",
    total: 1200,
  },
  {
    id: 4,
    title: "Movies",
    color: "#0d79a1",
    total: 800,
  },
  {
    id: 5,
    title: "Holiday",
    color: "#f21654",
    total: 1500,
  },
];

export default function Home() {
  const [showAddIcomeModal, setShowAddIcomeModal] = useState(false);
  const amountRef = useRef();
  const descriptionRef = useRef();

  const addIncomeHandler = async (event) => {
    event.preventDefault();
    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };
    const collectionRef = collection(db, "income");

    try {
      const docSnap = await addDoc(collectionRef, newIncome);
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
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="description">Description</label>
            <input
              ref={descriptionRef}
              name="description"
              type="text"
              placeholder="Enter income description"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary self-start">
            Add entry
          </button>
        </form>
      </Modal>
      <main className="container max-w-4xl mx-auto px-6">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormater(8000)}</h2>
        </section>
        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => setShowAddIcomeModal(true)}
            className="btn btn-primary z-0"
          >
            + Expenses
          </button>
          <button className="btn btn-primary-outline">+ Income</button>
        </section>
        {/* Expenses: */}
        <section className="py-6">
          <h3 className="text-2xl pb-3">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {DUMMY_DATA &&
              DUMMY_DATA.map((expense) => (
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
                labels: DUMMY_DATA.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: DUMMY_DATA.map((expense) => expense.total),
                    backgroundColor: DUMMY_DATA.map((expense) => expense.color),
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
