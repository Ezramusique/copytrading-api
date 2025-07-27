const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// TEMP license key storage (mock database)
const licenseKeys = {
  "abc123": {
      valid: true,
          mentor: "MentorA",
              email: "test@example.com",
                  expires: "2025-12-31"
                    },
                      "xyz789": {
                          valid: true,
                              mentor: "MentorB",
                                  email: "user2@example.com",
                                      expires: "2025-11-01"
                                        }
                                        };

                                        // Root test route
                                        // Root test route
                                        app.get("/", (req, res) => {
                                          res.send("Copytrading API is running.");
                                        });

                                        // Check license key
                                        app.post("/check-license", (req, res) => {
                                            const { licenseKey } = req.body;
                                        
                                            if (!licenseKey) {
                                                return res.status(400).json({ success: false, message: "License key is required" });
                                            }
                                        
                                            const data = licenseKeys[licenseKey];
                                        
                                            if (data && data.valid) {
                                                return res.status(200).json({ success: true, ...data });
                                            } else {
                                                return res.status(401).json({ success: false, message: "Invalid or expired license key" });
                                            }
                                        });

                                                                    app.listen(PORT, () => {
                                                                      console.log(`Server running on port ${PORT}`);
                                                                      });
