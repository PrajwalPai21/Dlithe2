import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Table, Button } from "react-bootstrap";


// import "../App.css"
function Home() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(1000);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(savedTransactions);
  }, []);

  const handleTransaction = (amount) => {
    if (balance + amount < 0) {
      alert("Insufficient balance!");
      return;
    }

    setBalance(balance + amount);

    const newTransaction = {
      id: transactions.length + 1,
      type: amount > 0 ? "Deposit" : "Withdrawal",
      amount: Math.abs(amount),
      date: new Date().toLocaleString(),
    };

    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  const logoutFunc = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  }

  const clearHistory = () => {
    localStorage.removeItem("transactions");
    setTransactions([]);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Welcome to Your Bank</h2>

      <Card className="text-center p-3 mt-4 shadow">
        <h4>Current Balance</h4>
        <h2>${balance}</h2>
      </Card>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button variant="success" onClick={() => handleTransaction(500)}>Deposit $500</Button>
        <Button variant="danger" onClick={() => handleTransaction(-500)}>Withdraw $500</Button>
        <Button variant="warning" onClick={clearHistory}>Clear History</Button>
        <Button variant="danger" onClick={logoutFunc}>Log Out</Button>
      </div>

      <h4 className="mt-4">Transaction History</h4>
      <Table striped bordered hover className="mt-2">
        <thead>
          <tr>
            <th>SI No.</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No transactions yet</td>
            </tr>
          ) : (
            transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.id}</td>
                <td>{tx.type}</td>
                <td>${tx.amount}</td>
                <td>{tx.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
}
export default Home;
