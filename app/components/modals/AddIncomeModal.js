import { useRef,useEffect } from "react";
import Modal from "../Modal";
import { currencyFormatter } from "@/lib/utils";
import { db } from "lib/firebase";
import { collection, addDoc, getDocs,doc,deleteDoc } from "firebase/firestore";
import {FaRegTrashAlt} from 'react-icons/fa'



function addIncomeModal({ show, onClose }){
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
          setIncome((prevState) => {
            return [
              ...prevState,
              {
                id: docSnap.id,
                ...newIncome,
              },
            ];
          });
          descriptionRef.current.value = "";
          amountRef.current.value = "";
        } catch (error) {
          console.log(error.message);
        }
      };
    
      useEffect(() => {
        const getIncomeData = async () => {
          const collectionRef = collection(db, "income");
          const docsSnap = await getDocs(collectionRef);
          const data = docsSnap.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis()),
            };
          });
          setIncome(data);
        };
        getIncomeData();
      }, []);
    
      const deleteIncomeEntryHandler = async (incomeId) => {
        const docRef = doc(db, "income", incomeId);
        try {
          await deleteDoc(docRef);
          setIncome((prevState) => {
            return prevState.filter((i) => i.id !== incomeId);
          });
          // Update State
          
        } catch (error) {
          console.log(error.message);
        }
      };
    return(
        <Modal show={show} onClose={onClose}>
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
                  <small className="text-xs">{i.createdAt.toISOString()}</small>
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
    )
}

export default addIncomeModal;