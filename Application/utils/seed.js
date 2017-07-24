const sha256 = require('sha256');
const { ObjectID } = require('mongodb');

const password = sha256('1234');

const seed = async (db) => {
    const adminCollection = db.collection('admins');
    await adminCollection.deleteMany();

    const apartmentsCollection = db.collection('apartments');
    await apartmentsCollection.deleteMany();

    const requestsCollection = db.collection('requests');
    await requestsCollection.deleteMany();

    const feesCollection = db.collection('fees');
    await feesCollection.deleteMany();

    const expensesCollection = db.collection('expenses');
    await expensesCollection.deleteMany();

    const admin = {
        username: 'InjTonchev',
        password: password,
    };

    await adminCollection.insertOne(admin);

    const requests = Array.from({ length: 5 })
        .map((_, index) => {
            return {
                number: 25 + index,
                password: password,
                username: `apt${25 + index}`,
            };
        });

    await requestsCollection.insertMany(requests);

    const apartments = Array.from({ length: 24 })
        .map((_, index) => {
            return {
                number: index + 1,
                username: `apt${index + 1}`,
                password: password,
                moveInDate: Date.now(),
                paidFees: [],
                notPaidFees: [],
                paidExpenses: [],
                notPaidExpenses: [],
            };
        });

    await apartmentsCollection.insertMany(apartments);

    const allapts = (await apartmentsCollection.find().toArray())
        .map((apt) => {
            return {
                _id: new ObjectID(apt._db),
                number: apt.number,
                username: apt.username,
                moveInDate: apt.moveInDate,
            };
        });

    const groupOne = allapts
        .filter((x) => x.number >= 1 && x.number <= 6);
    const groupTwo = allapts
        .filter((x) => x.number >= 7 && x.number <= 12);
    const groupThree = allapts
        .filter((x) => x.number >= 13 && x.number <= 18);
    const groupFour = allapts
        .filter((x) => x.number >= 19 && x.number <= 24);

    const fees = Array.from({ length: 5 })
        .map((_, index) => {
            return {
                month: index + 1,
                year: 2017,
                cost: 50,
                paid: [],
                notPaid: [],
            };
        });

    for (let i = 0; i < fees.length; i++) {
        if (i === 0 || i === 1) {
            fees[i].paid.push(...allapts);
        }
        if (i === 2) {
            fees[i].notPaid.push(...groupFour);
            fees[i].paid.push(...groupThree);
            fees[i].paid.push(...groupTwo);
            fees[i].paid.push(...groupOne);
        }

        if (i === 3) {
            fees[i].notPaid.push(...groupFour);
            fees[i].notPaid.push(...groupThree);
            fees[i].paid.push(...groupTwo);
            fees[i].paid.push(...groupOne);
        }

        if (i === 4) {
            fees[i].notPaid.push(...groupFour);
            fees[i].notPaid.push(...groupThree);
            fees[i].notPaid.push(...groupTwo);
            fees[i].paid.push(...groupOne);
        }
    }

    await feesCollection.insertMany(fees);

    const expenses = Array.from({ length: 5 })
        .map((_, index) => {
            return {
                name: 'expense ' + (index + 1),
                description: 'very awesome description ' + (index + 1),
                cost: 500,
                state: index <= 4 ? 'completed' : 'pending',
                paid: [],
                notPaid: [],
            };
        });

    for (let i = 0; i < expenses.length; i++) {
        if (i <= 1) {
            expenses[i].paid.push(...allapts);
        }
        if (i === 2) {
            expenses[i].notPaid.push(...groupFour);
            expenses[i].paid.push(...groupThree);
            expenses[i].paid.push(...groupTwo);
            expenses[i].paid.push(...groupOne);
        }

        if (i === 3) {
            expenses[i].notPaid.push(...groupFour);
            expenses[i].notPaid.push(...groupThree);
            expenses[i].paid.push(...groupTwo);
            expenses[i].paid.push(...groupOne);
        }
        if (i === 4) {
            expenses[i].notPaid.push(...groupFour);
            expenses[i].notPaid.push(...groupThree);
            expenses[i].notPaid.push(...groupTwo);
            expenses[i].paid.push(...groupOne);
        }
    }

    await expensesCollection.insertMany(expenses);

    const allFees = (await feesCollection.find().toArray())
        .map((fee) => {
            return {
                _id: new ObjectID(fee._db),
                month: fee.month,
                year: fee.year,
                cost: fee.cost,
            };
        });

    const allExpenses = (await expensesCollection.find().toArray())
        .map((exp) => {
            return {
                _id: new ObjectID(exp._db),
                name: exp.name,
                description: exp.description,
                cost: exp.cost,
                state: exp.state,
            };
        });

    const allApartments = await apartmentsCollection.find().toArray();

    for (let i = 1; i <= 24; i++) {
        if (i >= 1 && i <= 6) {
            const apt = allApartments[i - 1];
            apt.paidFees.push(...allFees);
            apt.paidExpenses.push(...allExpenses);
            await apartmentsCollection.updateOne({ number: i }, apt);
        }
        if (i >= 7 && i <= 12) {
            const apt = allApartments[i - 1];
            apt.paidFees
                .push(allFees[0], allFees[1], allFees[2], allFees[3]);
            apt.notPaidFees.push(allFees[4]);
            apt.paidExpenses.push(allExpenses[0],
                allExpenses[1],
                allExpenses[2],
                allExpenses[3]);
            apt.notPaidExpenses.push(allExpenses[4]);
            await apartmentsCollection.updateOne({ number: i }, apt);
        }
        if (i >= 13 && i <= 18) {
            const apt = allApartments[i - 1];
            apt.paidFees
                .push(allFees[0], allFees[1], allFees[2]);
            apt.notPaidFees.push(allFees[3], allFees[4]);
            apt.paidExpenses
                .push(allExpenses[0], allExpenses[1], allExpenses[2]);
            apt.notPaidExpenses.push(allExpenses[3], allExpenses[4]);
            await apartmentsCollection.updateOne({ number: i }, apt);
        }
        if (i >= 19 && i <= 24) {
            const apt = allApartments[i - 1];
            apt.paidFees.push(allFees[0], allFees[1]);
            apt.notPaidFees.push(allFees[2], allFees[3], allFees[4]);
            apt.paidExpenses
                .push(allExpenses[0], allExpenses[1]);
            apt.notPaidExpenses
                .push(allExpenses[2], allExpenses[3], allExpenses[4]);
            await apartmentsCollection.updateOne({ number: i }, apt);
        }
    }

    const moreApts = Array.from({ length: 26 })
        .map((_, index) => {
            return {
                number: index + 25,
                username: '',
                password: '',
                moveInDate: '',
                paidFees: [],
                notPaidFees: [],
                paidExpenses: [],
                notPaidExpenses: [],
            };
        });

    await apartmentsCollection.insertMany(moreApts);
};

module.exports = seed;
