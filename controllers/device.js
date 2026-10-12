/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
import { Device, sequelize } from "../models/Device.js";

await sequelize.sync();

const device = {
  index: async (req, res) => {
    try {
      const data = await Device.findAll({ raw: true });
      return res.render("home", { title: "Device List", data });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },

  add: (req, res) => {
    return res.render("add", { title: "Add Device" });
  },

  insert: async (req, res) => {
    try {
      const { s1, s2, s3, s4, s5 } = req.body;
      await Device.create({ s1, s2, s3, s4, s5 });
      return res.redirect("/");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },

  edit: async (req, res) => {
    try {
      const record = await Device.findByPk(req.params.id);
      if (!record) return res.status(404).send("Device not found");

      return res.render("edit", {
        title: "Edit Device",
        data: record.get({ plain: true })
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },

  update: async (req, res) => {
    try {
      const record = await Device.findByPk(req.params.id);
      if (!record) return res.status(404).send("Device not found");

      const { s1, s2, s3, s4, s5 } = req.body;
      await record.update({ s1, s2, s3, s4, s5 });
      return res.redirect("/");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },

  delete: async (req, res) => {
    try {
      const record = await Device.findByPk(req.params.id);
      if (!record) return res.status(404).send("Device not found");

      await record.destroy();
      return res.redirect("/");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },

  all: async (req, res) => {
    try {
      const devices = await Device.findAll();
      return res.json(devices);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  show: async (req, res) => {
    try {
      const data = await Device.findByPk(req.params.id);
      if (!data) return res.status(404).json({ message: "Device not found" });
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export { device };
