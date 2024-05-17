"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/stores/cart.store";
import { Button } from "./ui/button";
import { useStore } from "@/hooks/useStore";
import { useProfileStore } from "@/stores/profile.store";
import { convertCurrency } from "@/lib/currencies";

export const TotalCart: React.FC = () => {
  const [totalInUSD, setTotalInUSD] = useState(0);
  const [totalInMyCurrency, setTotalInMyCurrency] = useState(0);
  const [isUSDCurrency, setIsUSDCurrency] = useState<boolean>(false);
  const cartStore = useStore(useCartStore, (s) => s);
  const profileStore = useStore(useProfileStore, (s) => s);

  const handlePay = async () => {
    if (!profileStore || !cartStore) return;

    if (!profileStore.user) return;

    const myBalance = profileStore.user.balance;

    if (myBalance.amount >= totalInMyCurrency) {
      profileStore.subtractBalance(totalInMyCurrency);
      alert("lo compraste, felicidades!");
      cartStore.removeAll();
      alert("Tu carrito se ha limpiado.");
    } else {
      alert("No tienes saldo suficiente!");
      alert("Se te duplicará el saldo en un momento...");
      profileStore.addBalance(myBalance.amount);
      alert("Listo!");
    }
  };

  useEffect(() => {
    cartStore?.getTotalPrice()?.then((totalPrice) => {
      setTotalInUSD(totalPrice);
    });
  }, [cartStore]);

  useEffect(() => {
    if (!profileStore) return;

    if (!profileStore.user) return;

    setIsUSDCurrency(profileStore.user.balance.currency === "USD");
  }, [profileStore]);

  useEffect(() => {
    if (!profileStore) return;

    if (!profileStore.user) return;

    if (isUSDCurrency) return;

    convertCurrency("USD", profileStore.user.balance.currency, totalInUSD).then(
      (totalAmountInUserCurrency) => {
        setTotalInMyCurrency(totalAmountInUserCurrency);
      }
    );
  }, [totalInUSD, profileStore, isUSDCurrency]);

  if (!cartStore || !profileStore) return null;

  if (!profileStore.user) return null;

  return (
    <div className="mt-8 flex-col flex gap-4">
      {!isUSDCurrency ? (
        <div className="flex justify-between">
          <p className="text-sm text-green-500 font-semibold">
            {totalInUSD} USD
          </p>
          <p className="text-primary text-sm font-bold">Total en USD</p>
        </div>
      ) : null}

      <div className="flex justify-between">
        <p className="text-xl text-green-500 font-semibold">
          {totalInMyCurrency} {profileStore.user.balance.currency}
        </p>
        <p className="text-primary text-xl font-bold">
          Total en {profileStore.user.balance.currency}
        </p>
      </div>

      <Button onClick={handlePay}>Pagar</Button>
    </div>
  );
};
