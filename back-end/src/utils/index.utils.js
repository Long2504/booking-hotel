import _ from "lodash";

const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields);
};

const typeOf = (object) => {
    return Object.prototype.toString.call(object).slice(8, -1);
};

export { getInfoData, typeOf };
