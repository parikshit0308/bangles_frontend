import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';

declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {

  loading = false;

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  payNow() {

    this.loading = true;

    this.api.post('payment/create', {})
      .subscribe({
        next: (res: any) => {

          console.log("create payment response===>",res)
          const options = {
            key: res.key,
            amount: res.amount,
            currency: res.currency,
            name: "Bangles Store",
            description: "Order Payment",
            order_id: res.razorpayOrderId,

            handler: (response: any) => {
              console.log("handler response",response)
              this.verifyPayment(response);
            },

            theme: {
              color: "#000000"
            }
          };

          const rzp = new Razorpay(options);
          rzp.open();

          this.loading = false;
        },
        error: (err) => {
          alert(err.error?.message || "Payment creation failed");
          this.loading = false;
        }
      });
  }

  verifyPayment(response: any) {

    this.api.post('payment/verify', response)
      .subscribe({
        next: (res: any) => {

          alert(res.message);

          this.router.navigate(['/orders']); // or success page
        },
        error: (err) => {
          console.log("Error verifying",err)
          alert(err.error?.message || "Payment verification failed");
        }
      });
  }
}
