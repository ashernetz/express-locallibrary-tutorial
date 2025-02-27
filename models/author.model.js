const mongoose = require("mongoose");
const { DateTime } = require("luxon"); // Importamos luxon para formatear fechas

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual para el nombre completo
AuthorSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }
  return fullname;
});

// Virtual para el URL del autor
AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

// Virtual para el lifespan (vida útil)
AuthorSchema.virtual("lifespan").get(function () {
  const birth = this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : "Unknown";
  const death = this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : "Present";
  return `${birth} - ${death}`;
});

// Exportar modelo
module.exports = mongoose.model("Author", AuthorSchema);
