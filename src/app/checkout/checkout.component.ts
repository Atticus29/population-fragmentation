import { Component, OnInit, Input, HostListener } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { masterConfigProperties } from '../masterConfiguration';


declare var StripeCheckout: StripeCheckoutStatic;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private functions: AngularFireFunctions, private auth: AuthService) { }
  // @Input() amount;
  private amount: number = masterConfigProperties.amountToCharge;
  // @Input() description;
  handler: StripeCheckoutHandler;
  confirmation: any;
  private loading: boolean = false;
  private displayThings: boolean = false;
  private localLoggedInStatus: boolean = false;
  private paymentStatus: string = "Payment Not Yet Processed"

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: 'pk_live_ztqhLfPwjEf2SFC26LDmWkXr',
      // image: '/your-avatar.png',
      locale: 'auto',
      source: async (source) => {
        this.displayThings = true;
        this.loading = true;
        console.log("got into source callback from handler in checkout.component");
        const user = await this.auth.getUser();
        console.log("user");
        console.log(user);
        const fun = this.functions.httpsCallable('stripeCreateCharge');
        this.confirmation = await fun({ source: source.id, uid: user.uid, amount: this.amount }).toPromise();
        console.log("this.confirmation");
        console.log(this.confirmation.outcome.seller_message);
        this.loading = false;
        if(this.confirmation.outcome.seller_message === "Payment complete."){
          this.paymentStatus = this.confirmation.outcome.seller_message + " Thank you!";
        } else{
          this.paymentStatus = this.confirmation.outcome.seller_message + " Thank you!";
        }
      }
    });
  }

  // Open the checkout handler
  // let chargeFun = fun.httpsCallable('stripeCreateCharge');
  // let chargeHandler = async(source) => {
  //   const res = await chargeFun({ source: source.id, amount: 3000 });
  //   console.log(res);
  //   alert('Success, charged customer $30.00');
  // }

  async checkout(e){
    console.log("checkout entered");
    // this.auth.signOut();
    // console.log("signed out");
    // this.signInAnonymously();
    // console.log("signed in");
    const user = await this.auth.getUser();
    // console.log("user in checkout");
    // console.log(user);
    this.handler.open({
      name: 'DraggleSimulator Store',
      description: "Help keep this site live",
      amount: this.amount,
      email: user.email,
    });
    e.preventDefault();
  }

  // Close on navigate
  @HostListener('window:popstate')
  onPopstate(){
    this.handler.close();
  }

  // signInAnonymously(){
  //   console.log("signInAnonymously in checkout component entered");
  //   this.auth.anonymousLogin();
  //   console.log("signInAnonymously in auth called successfully?");
  //   // const user = await this.auth.getUser();
  //   const user = this.auth.getUser().then(result =>{
  //     console.log("result of promise from auth get User call:");
  //     console.log(result);
  //     if(result){
  //       this.localLoggedInStatus = true;
  //     } else{
  //       this.localLoggedInStatus = false;
  //     }
  //   });
  // }

}
