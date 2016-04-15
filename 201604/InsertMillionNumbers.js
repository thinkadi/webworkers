function insertMillionNumbers() {
    for (i = 0; i < 100; i++) {
        for (j = 0; j < 100; j++) {
            for (k = 0; k < 100; k++) {
                db.numbers.insert({
                    a: i,
                    b: j,
                    c: k
                });
            }
        }
    }
}

insertMillionNumbers();
