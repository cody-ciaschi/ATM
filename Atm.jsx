const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ["Deposit", "Withdraw"];
    return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" disabled={isValid}></input>
    </label>
    );
};

const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMode, setAtmMode] = React.useState("");
    const [validTransaction, setValidTransaction] = React.useState(false);

    let status = `Account Balance $ ${totalState} `;

    const handleChange = event => {
        if (event.target.value <= 0) {
            setValidTransaction(false);
            return;
        } else if ((atmMode === "Withdraw") && (event.target.value > totalState)) {
            setValidTransaction(false);
        } else {
            setValidTransaction(true);
        }

        setDeposit(Number(event.target.value));
    };

    const handleSubmit = () => {
        let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
        setTotalState(newTotal);
        event.preventDefault();
    };

    const handleModeSelect = (e) => {
        setAtmMode(e.target.value);
        if (e.target.value === "Deposit") {
            setIsDeposit(true);
        } else {
            setIsDeposit(false);
        }
    };

    return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="withdraw-selection" value="Withdraw">Withdraw</option>
      </select>
      {
        atmMode && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={!validTransaction}></ATMDeposit>
      }
    </form>
    );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));