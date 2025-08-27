        const boardRef = document.querySelector('.board');

        const boardFragmentRef = document.createDocumentFragment();
        for (let i = 0; i < 8; i++) {
            let rowRef = document.createElement('div');
            rowRef.classList.add('row');

            for (let j = 0; j < 8; j++) {
                let boxRef = document.createElement('div');
                boxRef.classList.add('box');
                boxRef.innerText = `${i}, ${j}`;
                if (i ===3 && j===5) {
                    boxRef.innerHTML = `
                        <div class="bishop"></div>
                    `;
                }
                rowRef.appendChild(boxRef);
            }
            boardFragmentRef.appendChild(rowRef);
        }
        
        boardRef.appendChild(boardFragmentRef);


        function moveTopLeft(currentR, currentC) {
            const maxMove = Math.min(currentR, currentC);
            return [currentR - maxMove, currentC - maxMove];
        }

        function moveTopRight(currentR, currentC) {
            const maxMove = Math.min( currentR, 7 - currentC);
            return [currentR - maxMove, currentC + maxMove];
        }

        function moveBottomTop(currentX, currentY) {
            return //?;
        }

        function moveBottomRight(currentX, currentY) {
            return //?;
        }

        function greet(){
            console.log("hello");
        }
