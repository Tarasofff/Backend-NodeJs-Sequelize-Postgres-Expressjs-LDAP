const Audit = require('./audit.model');

const difference = (prev, current) => {
    let arr = [];
    Object.keys(prev).map(key => prev[key] !== current[key] && arr.push({column: key, prev: prev[key], current: current[key]}))
    return arr;
};

const audit = async (method, tableName, previous, currently, user,...theArgs) => {
    let state;

    if ((previous && currently) === null) state = null
    else state = difference(previous, currently);

    (method === "create") && await Audit.create({
        ldapUsername: user.username,
        event: method,
        userChangeId: theArgs[0].id,
        tableName: tableName,
        columnName: theArgs[1],
        prevValue: previous,
        currentValue: currently,
    });
    (method === "update" || method === "delete") && state.map(num => {
       return Audit.create({
       ldapUsername: user.username,
       event: method,
       userChangeId: currently.id,
       tableName: tableName,
       columnName: num.column,
       prevValue: num.prev,
       currentValue: num.current,
       });
    })
}

module.exports = audit;