import { useState } from "react";
import CTA from "./components/CTA";

function getRandomColor() {
  const colors = ["#DEE2FF", "#E4F5FE", "#F0F7E2", "#FFFEE3"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function App() {
  const [saleAmount, setSaleAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [paypalFees, setPaypalFees] = useState("Enter an amount above");
  const [calculatedFees, setCalculatedFees] = useState({
    feeAmount: 0,
    amountAfterFees: 0,
    amountToAsk: 0,
    saleValue: 0,
  });
  const [bgColor, setBgColor] = useState(getRandomColor());

  const changeBackgroundColor = () => {
    setBgColor(getRandomColor());
  };

  const currencySymbols = {
    USD: "$",
    INR: "₹",
    EUR: "€",
  };

  const calculateFees = (e) => {
    e.preventDefault();
    const fixedFee = 0.3;

    if (isNaN(saleAmount)) {
      return;
    }

    let feePercentage = 0;

    if (saleAmount <= 3000) {
      feePercentage = 4.4;
      setPaypalFees("4.4% + 0.30");
    } else if (saleAmount <= 10000) {
      feePercentage = 3.9;
      setPaypalFees("3.9% + 0.30");
    } else if (saleAmount <= 100000) {
      feePercentage = 3.7;
      setPaypalFees("3.7% + 0.30");
    } else {
      feePercentage = 3.4;
      setPaypalFees("3.4% + 0.30");
    }

    const feeAmount = (saleAmount * feePercentage) / 100 + fixedFee;
    const amountAfterFees = saleAmount - feeAmount;
    const amountToAsk = saleAmount + feeAmount;

    setCalculatedFees({
      feeAmount: feeAmount.toFixed(2),
      amountAfterFees: amountAfterFees.toFixed(2),
      amountToAsk: amountToAsk.toFixed(2),
      saleValue: saleAmount.toFixed(2),
    });
  };

  const resetAmount = (e) => {
    e.preventDefault();
    setSaleAmount(0);
    setCurrency("USD");
    setPaypalFees(0);
    setCalculatedFees({
      feeAmount: 0,
      amountAfterFees: 0,
      amountToAsk: 0,
      saleValue: 0,
    });
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center mx-5">
        <div
          className="container rounded-3xl w-full max-w-5xl p-12 md:p-20 mx-4 my-16"
          style={{ backgroundColor: bgColor }}
        >
          <section className="calculator-section flex-wrap lg:flex-nowrap flex gap-12 ">
            <div className="input-section w-full xl:w-1/2">
              <h2 className="text-[#0D0543] font-semibold text-4xl md:text-6xl leading-[48px] md:leading-[72px] whitespace-nowrap text-center md:text-left">
                Fueler Paypal <br />
                Fee Calculator
              </h2>
              <form className="mt-14">
                <div className="flex flex-col md:flex-row gap-4 w-full">
                  <div className="w-full md:w-1/2">
                    <label
                      className="block text-[#0D0543] text-lg font-semibold"
                      htmlFor="saleAmount"
                    >
                      ENTER AN AMOUNT
                    </label>
                    <input
                      className="block w-full p-5 border-2 border-[#0D0543] rounded-lg  focus:outline-none h-[60px]"
                      type="number"
                      step="0.01"
                      id="saleAmount"
                      required
                      value={saleAmount}
                      onChange={(e) =>
                        setSaleAmount(parseFloat(e.target.value))
                      }
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="currency"
                      className="block text-[#0D0543] text-lg font-semibold"
                    >
                      CURRENCY
                    </label>
                    <select
                      id="currency"
                      className="block w-full p-5 border-2 border-[#0D0543] rounded-lg  focus:outline-none h-[60px]"
                      required
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option value="USD">USD</option>
                      <option value="INR">INR</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    className="block text-[#0D0543] text-lg font-semibold"
                    htmlFor="paypalFees"
                  >
                    PAYPAL FEES
                  </label>
                  <input
                    className="block w-full p-5 cursor-not-allowed border-2 border-[#0D0543] rounded-lg  focus:outline-none h-[60px]"
                    type="text"
                    id="paypalFees"
                    readOnly
                    placeholder={paypalFees}
                  />
                </div>
                <div className="mt-14 flex flex-col md:flex-row gap-4">
                  <button
                    className="rounded-lg bg-[#0D0543] px-5 py-4 w-full md:w-auto grid place-items-center"
                    onClick={resetAmount}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 12C22 17.52 17.52 22 12 22C6.48 22 3.11 16.44 3.11 16.44M3.11 16.44H7.63M3.11 16.44V21.44M2 12C2 6.48 6.44 2 12 2C18.67 2 22 7.56 22 7.56M22 7.56V2.56M22 7.56H17.56"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                  <button
                    className="rounded-lg bg-[#0D0543] text-white font-medium text-lg leading-[28px] tracking-[-0.64px] px-10 py-4 w-full md:w-auto"
                    onClick={calculateFees}
                  >
                    Calculate Fees
                  </button>
                </div>
              </form>
            </div>
            <div className="output-section w-full xl:w-1/2 flex flex-col gap-12">
              <div className="receive-section bg-white rounded-3xl border-2 border-[#0D0543] p-5 flex flex-col justify-center gap-3 flex-1">
                <p className="text-[#0D0543] text-3xl font-semibold">
                  You Will Receive:
                </p>
                <p className="text-[#0D0543] text-6xl font-semibold leading-16 tracking-tighter">
                  <span>{currencySymbols[currency]}</span>
                  {calculatedFees.amountAfterFees}
                </p>
                <p className="text-[#0D0543] text-base font-medium transform-lowercase">
                  If you invoice <span>{currencySymbols[currency]}</span>
                  {calculatedFees.saleValue}
                </p>
              </div>
              <div className="ask-for-section bg-white rounded-3xl border-2 border-[#0D0543] p-5 flex flex-col justify-center gap-3 flex-1">
                <p className="text-[#0D0543] text-3xl font-semibold">
                  You should ask for:
                </p>
                <p className="text-[#0D0543] text-6xl font-semibold leading-16 tracking-tighter">
                  <span>{currencySymbols[currency]}</span>
                  {calculatedFees.amountToAsk}
                </p>
                <p className="text-[#0D0543] text-base font-medium transform-lowercase">
                  If you need <span>{currencySymbols[currency]}</span>
                  {calculatedFees.saleValue}
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className="max-w-5xl mb-12">
          <section className="cta-section">
            <CTA />
          </section>
        </div>
      </div>
    </>
  );
}

export default App;
