
export default function Loading({ loadingText = "Loading", errorText = "Loading error", error = false }) {
   return (
      <div className="loading">
         <div>
            {error ?
               (
                  <span>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24px" width="24px" fill="#1f1f1f"><path d="M7.45,12.6L11.03,10L7.45,7.4L6.55,8.6L8.48,10L6.55,11.4l0.9,1.2Zm9.1,0l0.9-1.2L15.53,10l1.92-1.4l-0.9-1.2L12.98,10l3.57,2.6ZM10.5,17.05l1.5-1.5l1.5,1.5l1.5-1.5l0.98,0.97l1.05-1.05L15,13.45l-1.5,1.5L12,13.45l-1.5,1.5L9,13.45L6.98,15.48l1.05,1.05L9,15.55l1.5,1.5ZM8.1,21.21q-1.82-0.79-3.17-2.14Q3.58,17.73 2.79,15.9T2,12Q2,9.92 2.79,8.1Q3.58,6.27 4.93,4.93Q6.28,3.57 8.1,2.79Q9.93,2 12,2t3.9,0.79t3.17,2.14q1.35,1.35 2.14,3.17Q22,9.92 22,12t-0.79,3.9t-2.14,3.17q-1.35,1.35-3.17,2.14T12,22q-2.07,0-3.9-0.79ZM12,12Zm5.68,5.68Q20,15.35 20,12T17.68,6.32T12,4T6.33,6.32T4,12t2.33,5.68T12,20t5.68-2.32Z" /></svg>
                     {errorText}
                  </span>
               ) :
               (
                  <span>{loadingText}</span>
               )
            }
         </div>

         {!error && (
            <>
               <div class="spinner">
                  <div class="inner"></div>
                  <div class="inner"></div>
                  <div class="inner"></div>
                  <div class="inner"></div>
                  <div class="inner"></div>
                  <div class="inner"></div>
                  <div class="inner"></div>
                  <div class="inner"></div>
                  <div class="inner"></div>
               </div>

               <style>
                  {`
                  .spinner {
                     --radius: 15px;
                     border-radius: 100vw;
                     display: grid;
                     place-items: center;
                     grid-template-areas: "stack";
                     width: calc(var(--radius) * 2);
                     aspect-ratio: 1/1;
                     animation: spinner1-outer-spin 2000ms linear infinite;

                     .inner {
                        grid-area: stack;
                        background-color: teal;
                        border-radius: 100vw;
                        width: 15%;
                        aspect-ratio: 1/1;
                        transform: translate(0, var(--radius));
                        rotate: 0deg;
                        animation: spinner1-inner-move 7000ms linear infinite;
                     }

                     .inner:nth-of-type(2) {
                        rotate: -40deg;
                     }

                     .inner:nth-of-type(3) {
                        rotate: -80deg;
                     }

                     .inner:nth-of-type(4) {
                        rotate: -120deg;
                     }

                     .inner:nth-of-type(5) {
                        rotate: -160deg;
                     }

                     .inner:nth-of-type(6) {
                        rotate: -200deg;
                     }

                     .inner:nth-of-type(7) {
                        rotate: -240deg;
                     }

                     .inner:nth-of-type(8) {
                        rotate: -280deg;
                     }

                     .inner:nth-of-type(9) {
                        rotate: -320deg;
                     }
                  }

                  @keyframes spinner1-outer-spin {
                     100% {
                        rotate: 360deg;
                     }
                  }

                  @keyframes spinner1-inner-move {
                     50% {
                        rotate: 0deg;
                     }
                  }
               `}
               </style>
            </>
         )}
      </div>
   )
}