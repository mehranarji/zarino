import { FC, useEffect, useMemo, useRef, useState } from "react";
import InputRow from "../../components/InputRow";
import InputRowLabel from "../../components/InputRow/InputRowLabel";
import SellActionSheet from "./SellActionSheet";

const Sell: FC = () => {
    const [priceStr, setPriceStr] = useState("");
    const [wageStr, setWageStr] = useState("");
    const [weightStr, setWeightStr] = useState("");
    const [taxStr, setTaxStr] = useState("");
    const [profitStr, setProfitStr] = useState("");
    const wageInputRef = useRef<HTMLInputElement>(null);
    const weightInputRef = useRef<HTMLInputElement>(null);

    const result = useMemo(() => {
        const profit = +profitStr;
        const price = +priceStr;
        const wage = +wageStr;
        const tax = +taxStr;
        const weight = parseFloat(weightStr);

        let totalCost = (price + wage) * weight;
        totalCost += totalCost * (profit / 100);

        let profitAndWage = totalCost - (weight * price);
        let vat = profitAndWage * (tax / 100);

        let result = totalCost + vat;

        return result || null;
    }, [priceStr, wageStr, weightStr, profitStr, taxStr]);

    const onSubmit = () => {
        weightInputRef.current?.focus();

        profitStr && localStorage.setItem("profit", profitStr);
        priceStr && localStorage.setItem("price", priceStr);
        wageStr && localStorage.setItem("wage", wageStr);
        taxStr && localStorage.setItem("tax", taxStr);
    };

    useEffect(() => {
        const regex = /^\d*\.\d{3,}$/;

        if (regex.test(weightStr + "")) {
            wageInputRef.current?.focus();
        }
    }, [weightStr]);

    useEffect(() => {
        setProfitStr(localStorage.getItem("profit") || "");
        setPriceStr(localStorage.getItem("price") || "");
        setWageStr(localStorage.getItem("wage") || "");
        setTaxStr(localStorage.getItem("tax") || "");

        weightInputRef.current?.focus();
    }, []);

    return (
        <>
            <form
                className="pb-60 sm:pb-0"
                onSubmit={(ev) => {
                    ev.preventDefault();
                    onSubmit();
                }}
            >
                <InputRow
                    inputMode="tel"
                    dir="ltr"
                    className="text-left"
                    value={priceStr}
                    min={0}
                    step={500}
                    onFocus={(ev) => ev.target.select()}
                    onChange={(ev) => setPriceStr(ev.target.value)}
                    label={<InputRowLabel title="نرخ" />}
                />
                <InputRow
                    inputMode="tel"
                    dir="ltr"
                    className="text-left"
                    value={taxStr}
                    min={0}
                    step={500}
                    onFocus={(ev) => ev.target.select()}
                    onChange={(ev) => setTaxStr(ev.target.value)}
                    label={<InputRowLabel title="مالیات" />}
                />
                <InputRow
                    inputMode="tel"
                    dir="ltr"
                    className="text-left"
                    value={profitStr}
                    min={0}
                    onFocus={(ev) => ev.target.select()}
                    onChange={(ev) => setProfitStr(ev.target.value)}
                    label={<InputRowLabel title="سود" />}
                />
                <InputRow
                    inputMode="tel"
                    dir="ltr"
                    className="text-left"
                    ref={weightInputRef}
                    value={weightStr}
                    min={0}
                    step={0.01}
                    onFocus={(ev) => ev.target.select()}
                    onChange={(ev) => setWeightStr(ev.target.value)}
                    label={<InputRowLabel title="وزن" />}
                />
                <InputRow
                    inputMode="tel"
                    className="text-left"
                    dir="ltr"
                    ref={wageInputRef}
                    value={wageStr}
                    min={0}
                    onFocus={(ev) => ev.target.select()}
                    onChange={(ev) => setWageStr(ev.target.value)}
                    label={<InputRowLabel title="اجرت" />}
                />
                <button type="submit" className="sr-only" tabIndex={-1}>
                    Submit
                </button>
            </form>

            <SellActionSheet result={result} />
        </>
    );
};

export default Sell;
