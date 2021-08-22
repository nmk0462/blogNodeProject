module.exports = function () {

    // Get access to `req` and `res`
    const req = this.req;
    const res = this.res;

    // Set status code and send response data.
    res.status(204);
    return res.json(null);

};