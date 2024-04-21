import { Box, TextField, Typography } from "@mui/material";
import { useState, useEffect, useCallback } from "react";

function AppointmentBillingBox({
  proceduresTotalPrice,
  suppliesTotalPrice,
  medicineTotalPrice,
  onTotalPriceChange,
}: {
  proceduresTotalPrice: number;
  suppliesTotalPrice: number;
  medicineTotalPrice: number;
  onTotalPriceChange: (totalPrice: number) => void;
}) {
  const [taxProcedures, setTaxProcedures] = useState(24);
  const [taxMedicine, setTaxMedicine] = useState(10);
  const [taxSupplies, setTaxSupplies] = useState(24);
  const [taxOther, setTaxOther] = useState(24);

  const [priceOther, setPriceOther] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = useCallback(() => {
    return (
      proceduresTotalPrice +
      (proceduresTotalPrice * taxProcedures) / 100 +
      medicineTotalPrice +
      (medicineTotalPrice * taxMedicine) / 100 +
      suppliesTotalPrice +
      (suppliesTotalPrice * taxSupplies) / 100
    );
  }, [
    proceduresTotalPrice,
    taxProcedures,
    medicineTotalPrice,
    taxMedicine,
    suppliesTotalPrice,
    taxSupplies,
  ]);

  useEffect(() => {
    const totalPrice = calculateTotalPrice();
    setTotalPrice(totalPrice);
    onTotalPriceChange(totalPrice);
  }, [calculateTotalPrice, onTotalPriceChange]);

  // Helper function to format numbers to 2 decimal places
  const formatNumber = (num: number) => num.toFixed(2);

  return (
    <Box sx={{ width: "100%", p: 1 }}>
      <Box
        sx={{
          display: "flex",
          height: "10%",
          width: "100%",
          border: "solid 1px black",
          p: 1,
        }}
      >
        <Box sx={{ width: "20%", height: "100%" }}></Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>Tax%</Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>Tax sum</Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>Price tax 0%</Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>Price + tax</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "15%",
          width: "100%",
          border: "solid 1px black",
          p: 1,
        }}
      >
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>Procedures</Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <TextField
            size="small"
            type="number"
            value={taxProcedures}
            onChange={(e) => setTaxProcedures(Number(e.target.value))}
          />
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>
            {formatNumber((proceduresTotalPrice * taxProcedures) / 100)}
          </Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>{formatNumber(proceduresTotalPrice)}</Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>
            {formatNumber(
              proceduresTotalPrice +
                (proceduresTotalPrice * taxProcedures) / 100
            )}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "15%",
          width: "100%",
          border: "solid 1px black",
          p: 1,
        }}
      >
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>Medicine</Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <TextField
            size="small"
            type="number"
            value={taxMedicine}
            onChange={(e) => setTaxMedicine(Number(e.target.value))}
          />
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>
            {formatNumber((medicineTotalPrice * taxMedicine) / 100)}
          </Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>{formatNumber(medicineTotalPrice)}</Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>
            {formatNumber(
              medicineTotalPrice + (medicineTotalPrice * taxMedicine) / 100
            )}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "15%",
          width: "100%",
          border: "solid 1px black",
          p: 1,
        }}
      >
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>Supplies</Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <TextField
            size="small"
            type="number"
            value={taxSupplies}
            onChange={(e) => setTaxSupplies(Number(e.target.value))}
          />
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>
            {formatNumber((suppliesTotalPrice * taxSupplies) / 100)}
          </Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>{formatNumber(suppliesTotalPrice)}</Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>
            {formatNumber(
              suppliesTotalPrice + (suppliesTotalPrice * taxSupplies) / 100
            )}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "15%",
          width: "100%",
          border: "solid 1px black",
          p: 1,
        }}
      >
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>Other</Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <TextField
            size="small"
            type="number"
            value={taxOther}
            onChange={(e) => setTaxOther(Number(e.target.value))}
          />
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography></Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography></Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}>
          <TextField
            size="small"
            type="number"
            value={priceOther}
            onChange={(e) => setPriceOther(Number(e.target.value))}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "15%",
          width: "100%",
          border: "solid 1px black",
          p: 1,
        }}
      >
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>Total</Typography>
        </Box>
        <Box sx={{ width: "20%", height: "100%" }}></Box>{" "}
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>
            {formatNumber(
              (proceduresTotalPrice * taxProcedures) / 100 +
                (medicineTotalPrice * taxMedicine) / 100 +
                (suppliesTotalPrice * taxSupplies) / 100
            )}
          </Typography>
        </Box>{" "}
        <Box sx={{ width: "20%", height: "100%" }}>
          <Typography>
            {formatNumber(
              proceduresTotalPrice + medicineTotalPrice + suppliesTotalPrice
            )}
          </Typography>
        </Box>{" "}
        <Box sx={{ width: "20%", height: "100%" }}>
          <TextField
            size="small"
            value={totalPrice.toFixed(2)}
            disabled
            sx={{ width: "100%", height: "100%" }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default AppointmentBillingBox;
