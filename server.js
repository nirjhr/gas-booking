const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Create a connection to the database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gas_booking_system",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected...");
});

// Route to add a new state office
app.post("/add-state-office", (req, res) => {
  const newStateOffice = {
    StateName: req.body.StateName,
    Address: req.body.Address,
  };
  const sql = "INSERT INTO StateOffice (StateName, Address) VALUES (?, ?)";
  db.query(
    sql,
    [newStateOffice.StateName, newStateOffice.Address],
    (err, result) => {
      if (err) {
        res.status(500).send("Error adding state office");
        throw err;
      }
      res.send("State Office added successfully");
    }
  );
});
// Edit State Office
app.put("/edit-state-office/:id", (req, res) => {
  const stateOfficeID = req.params.id;
  const updatedStateOffice = {
    StateName: req.body.StateName,
    Address: req.body.Address,
  };
  const sql =
    "UPDATE StateOffice SET StateName = ?, Address = ? WHERE StateOfficeID = ?";
  db.query(
    sql,
    [updatedStateOffice.StateName, updatedStateOffice.Address, stateOfficeID],
    (err, result) => {
      if (err) {
        res.status(500).send("Error updating state office");
        throw err;
      }
      res.send("State Office updated successfully");
    }
  );
});

// Delete State Office
app.delete("/delete-state-office/:id", (req, res) => {
  const stateOfficeID = req.params.id;
  const sql = "DELETE FROM StateOffice WHERE StateOfficeID = ?";
  db.query(sql, [stateOfficeID], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting state office");
      throw err;
    }
    res.send("State Office deleted successfully");
  });
});

// View State Offices
app.get("/view-state-offices", (req, res) => {
  const sql = "SELECT * FROM StateOffice";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send("Error fetching state offices");
      throw err;
    }
    res.json(results);
  });
});
// Add Area Office
app.post("/add-area-office", (req, res) => {
  const newAreaOffice = {
    StateOfficeID: req.body.StateOfficeID,
    AreaName: req.body.AreaName,
    Address: req.body.Address,
    Manager: req.body.Manager,
  };
  const sql =
    "INSERT INTO AreaOffice (StateOfficeID, AreaName, Address, Manager) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [
      newAreaOffice.StateOfficeID,
      newAreaOffice.AreaName,
      newAreaOffice.Address,
      newAreaOffice.Manager,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send("Error adding area office");
        throw err;
      }
      res.send("Area Office added successfully");
    }
  );
});

// Edit Area Office
app.put("/edit-area-office/:id", (req, res) => {
  const areaOfficeID = req.params.id;
  const updatedAreaOffice = {
    StateOfficeID: req.body.StateOfficeID,
    AreaName: req.body.AreaName,
    Address: req.body.Address,
    Manager: req.body.Manager,
  };
  const sql =
    "UPDATE AreaOffice SET StateOfficeID = ?, AreaName = ?, Address = ?, Manager = ? WHERE AreaOfficeID = ?";
  db.query(
    sql,
    [
      updatedAreaOffice.StateOfficeID,
      updatedAreaOffice.AreaName,
      updatedAreaOffice.Address,
      updatedAreaOffice.Manager,
      areaOfficeID,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send("Error updating area office");
        throw err;
      }
      res.send("Area Office updated successfully");
    }
  );
});

// Delete Area Office
app.delete("/delete-area-office/:id", (req, res) => {
  const areaOfficeID = req.params.id;
  const sql = "DELETE FROM AreaOffice WHERE AreaOfficeID = ?";
  db.query(sql, [areaOfficeID], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting area office");
      throw err;
    }
    res.send("Area Office deleted successfully");
  });
});

// View Area Offices
app.get("/view-area-offices", (req, res) => {
  const sql = "SELECT * FROM AreaOffice";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send("Error fetching area offices");
      throw err;
    }
    res.json(results);
  });
});

// Add Distributor
app.post("/add-distributor", (req, res) => {
  const newDistributor = {
    AreaOfficeID: req.body.AreaOfficeID,
    DistributorName: req.body.DistributorName,
    Address: req.body.Address,
    Proprietor: req.body.Proprietor,
  };
  const sql =
    "INSERT INTO Distributor (AreaOfficeID, DistributorName, Address, Proprietor) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [
      newDistributor.AreaOfficeID,
      newDistributor.DistributorName,
      newDistributor.Address,
      newDistributor.Proprietor,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send("Error adding distributor");
        throw err;
      }
      res.send("Distributor added successfully");
    }
  );
});

// Edit Distributor
app.put("/edit-distributor/:id", (req, res) => {
  const distributorID = req.params.id;
  const updatedDistributor = {
    AreaOfficeID: req.body.AreaOfficeID,
    DistributorName: req.body.DistributorName,
    Address: req.body.Address,
    Proprietor: req.body.Proprietor,
  };
  const sql =
    "UPDATE Distributor SET AreaOfficeID = ?, DistributorName = ?, Address = ?, Proprietor = ? WHERE DistributorID = ?";
  db.query(
    sql,
    [
      updatedDistributor.AreaOfficeID,
      updatedDistributor.DistributorName,
      updatedDistributor.Address,
      updatedDistributor.Proprietor,
      distributorID,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send("Error updating distributor");
        throw err;
      }
      res.send("Distributor updated successfully");
    }
  );
});

// Delete Distributor
app.delete("/delete-distributor/:id", (req, res) => {
  const distributorID = req.params.id;
  const sql = "DELETE FROM Distributor WHERE DistributorID = ?";
  db.query(sql, [distributorID], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting distributor");
      throw err;
    }
    res.send("Distributor deleted successfully");
  });
});

// View Distributors
app.get("/view-distributors", (req, res) => {
  const sql = "SELECT * FROM Distributor";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send("Error fetching distributors");
      throw err;
    }
    res.json(results);
  });
});
// Add Consumer
app.post("/add-consumer", (req, res) => {
  const newConsumer = {
    DistributorID: req.body.DistributorID,
    ConsumerName: req.body.ConsumerName,
    Address: req.body.Address,
    PinCode: req.body.PinCode,
    ContactNo: req.body.ContactNo,
    EmailID: req.body.EmailID,
    NumOfCylinders: req.body.NumOfCylinders,
    DateOfConnection: req.body.DateOfConnection,
  };
  const sql =
    "INSERT INTO Consumer (DistributorID, ConsumerName, Address, PinCode, ContactNo, EmailID, NumOfCylinders, DateOfConnection) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      newConsumer.DistributorID,
      newConsumer.ConsumerName,
      newConsumer.Address,
      newConsumer.PinCode,
      newConsumer.ContactNo,
      newConsumer.EmailID,
      newConsumer.NumOfCylinders,
      newConsumer.DateOfConnection,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send("Error adding consumer");
        throw err;
      }
      res.send("Consumer added successfully");
    }
  );
});

// Edit Consumer
app.put("/edit-consumer/:id", (req, res) => {
  const consumerID = req.params.id;
  const updatedConsumer = {
    DistributorID: req.body.DistributorID,
    ConsumerName: req.body.ConsumerName,
    Address: req.body.Address,
    PinCode: req.body.PinCode,
    ContactNo: req.body.ContactNo,
    EmailID: req.body.EmailID,
    NumOfCylinders: req.body.NumOfCylinders,
    DateOfConnection: req.body.DateOfConnection,
  };
  const sql =
    "UPDATE Consumer SET DistributorID = ?, ConsumerName = ?, Address = ?, PinCode = ?, ContactNo = ?, EmailID = ?, NumOfCylinders = ?, DateOfConnection = ? WHERE ConsumerID = ?";
  db.query(
    sql,
    [
      updatedConsumer.DistributorID,
      updatedConsumer.ConsumerName,
      updatedConsumer.Address,
      updatedConsumer.PinCode,
      updatedConsumer.ContactNo,
      updatedConsumer.EmailID,
      updatedConsumer.NumOfCylinders,
      updatedConsumer.DateOfConnection,
      consumerID,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send("Error updating consumer");
        throw err;
      }
      res.send("Consumer updated successfully");
    }
  );
});

// Delete Consumer
app.delete("/delete-consumer/:id", (req, res) => {
  const consumerID = req.params.id;
  const sql = "DELETE FROM Consumer WHERE ConsumerID = ?";
  db.query(sql, [consumerID], (err, result) => {
    if (err) {
      res.status(500).send("Error deleting consumer");
      throw err;
    }
    res.send("Consumer deleted successfully");
  });
});

// View Consumers
app.get("/view-consumers", (req, res) => {
  const sql = "SELECT * FROM Consumer";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send("Error fetching consumers");
      throw err;
    }
    res.json(results);
  });
});

// Issue Subscription Voucher
app.post("/issue-sv", (req, res) => {
  const newSV = {
    ConsumerID: req.body.ConsumerID,
    DistributorID: req.body.DistributorID,
    DepositAmount: req.body.DepositAmount,
    CylinderType: req.body.CylinderType,
    NumOfCylinders: req.body.NumOfCylinders,
    DateOfConnection: req.body.DateOfConnection,
  };
  const sql =
    "INSERT INTO SubscriptionVoucher (ConsumerID, DistributorID, DepositAmount, CylinderType, NumOfCylinders, DateOfConnection) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      newSV.ConsumerID,
      newSV.DistributorID,
      newSV.DepositAmount,
      newSV.CylinderType,
      newSV.NumOfCylinders,
      newSV.DateOfConnection,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send("Error issuing subscription voucher");
        throw err;
      }
      res.send("Subscription Voucher issued successfully");
    }
  );
});

// Issue Termination Voucher
app.post("/issue-tv", (req, res) => {
  const newTV = {
    ConsumerID: req.body.ConsumerID,
    DistributorID: req.body.DistributorID,
    TransfereeDistributorID: req.body.TransfereeDistributorID,
    AmountPaid: req.body.AmountPaid,
    TVDate: req.body.TVDate,
    SVNumber: req.body.SVNumber,
  };
  const sql =
    "INSERT INTO TerminationVoucher (ConsumerID, DistributorID, TransfereeDistributorID, AmountPaid, TVDate, SVNumber) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      newTV.ConsumerID,
      newTV.DistributorID,
      newTV.TransfereeDistributorID,
      newTV.AmountPaid,
      newTV.TVDate,
      newTV.SVNumber,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send("Error issuing termination voucher");
        throw err;
      }
      res.send("Termination Voucher issued successfully");
    }
  );
});

// Create Gas Booking
app.post("/add-booking", (req, res) => {
  const newBooking = {
    ConsumerID: req.body.ConsumerID,
    BookingDate: req.body.BookingDate,
    DeliveryDate: req.body.DeliveryDate,
    BookingNumber: req.body.BookingNumber,
  };
  const sql =
    "INSERT INTO GasBooking (ConsumerID, BookingDate, DeliveryDate, BookingNumber) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [
      newBooking.ConsumerID,
      newBooking.BookingDate,
      newBooking.DeliveryDate,
      newBooking.BookingNumber,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send("Error adding booking");
        throw err;
      }
      res.send("Booking added successfully");
    }
  );
});

// View Booking History for a Specific Consumer
app.get("/view-bookings/:consumerID", (req, res) => {
  const consumerID = req.params.consumerID;
  const sql = "SELECT * FROM GasBooking WHERE ConsumerID = ?";
  db.query(sql, [consumerID], (err, results) => {
    if (err) {
      res.status(500).send("Error fetching bookings");
      throw err;
    }
    res.json(results);
  });
});

// Track Booking Status
app.get("/track-booking/:bookingNumber", (req, res) => {
  const bookingNumber = req.params.bookingNumber;
  const sql = "SELECT * FROM GasBooking WHERE BookingNumber = ?";
  db.query(sql, [bookingNumber], (err, result) => {
    if (err) {
      res.status(500).send("Error tracking booking");
      throw err;
    }
    if (result.length === 0) {
      res.status(404).send("Booking not found");
    } else {
      const currentDate = new Date();
      const deliveryDate = new Date(result[0].DeliveryDate);
      if (deliveryDate < currentDate) {
        res.json({
          ...result[0],
          status: `Gas delivered on: ${result[0].DeliveryDate}`,
        });
      } else {
        res.json({
          ...result[0],
          status: `Gas not delivered yet. Expected delivery date is: ${result[0].DeliveryDate}`,
        });
      }
    }
  });
});

// Add Cylinder Type
app.post("/add-cylinder", (req, res) => {
  const newCylinder = {
    Type: req.body.Type,
    Price: req.body.Price,
    Quantity: req.body.Quantity,
  };
  const sql = "INSERT INTO Cylinder (Type, Price, Quantity) VALUES (?, ?, ?)";
  db.query(
    sql,
    [newCylinder.Type, newCylinder.Price, newCylinder.Quantity],
    (err, result) => {
      if (err) {
        res.status(500).send("Error adding cylinder type");
        throw err;
      }
      res.send("Cylinder type added successfully");
    }
  );
});

// View Cylinder Types
app.get("/view-cylinders", (req, res) => {
  const sql = "SELECT * FROM Cylinder";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send("Error fetching cylinder types");
      throw err;
    }
    res.json(results);
  });
});

// Update Stock Registry
app.post("/update-stock", (req, res) => {
  const newStockEntry = {
    DistributorID: req.body.DistributorID,
    CylinderID: req.body.CylinderID,
    Quantity: req.body.Quantity,
  };
  const sql =
    "INSERT INTO StockRegistry (DistributorID, CylinderID, Quantity) VALUES (?, ?, ?)";
  db.query(
    sql,
    [
      newStockEntry.DistributorID,
      newStockEntry.CylinderID,
      newStockEntry.Quantity,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send("Error updating stock registry");
        throw err;
      }
      res.send("Stock registry updated successfully");
    }
  );
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
