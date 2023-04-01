module.exports = (mongoose) => {
    var schema = mongoose.Schema({
        _active: Boolean
    });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.Mid = _id;
        return object;
    });
    const Moderate = mongoose.model("Moderate", schema, "Moderate");
    return Moderate;
};