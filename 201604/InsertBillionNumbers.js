function insertBillionNumbers() {
    for (i = 0; i < 1000; i++) {
        for (j = 0; j < 1000; j++) {
            for (k = 0; k < 1000; k++) {
                db.numbers.insert({
                    a: i,
                    b: j,
                    c: k
                });
            }
        }
    }
}

insertBillionNumbers();
