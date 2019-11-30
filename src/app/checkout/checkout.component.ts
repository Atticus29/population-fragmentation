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
  @Input() description;
  handler: StripeCheckoutHandler;
  confirmation: any;
  loading: boolean = false;
  private localLoggedInStatus: boolean = false;

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: 'pk_test_NKyjLSwnMosdX0mIgQaRRHbS',
      // image: '/your-avatar.png',
      locale: 'auto',
      source: async (source) => {
        this.loading = true;
        const user = await this.auth.getUser();
        console.log("user");
        console.log(user);
        const fun = this.functions.httpsCallable('stripeCreateCharge');
        this.confirmation = await fun({ source: source.id, uid: user.uid, amount: this.amount }).toPromise();
        console.log("this.confirmation");
        console.log(this.confirmation);
        this.loading = false;
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
    const user = await this.auth.getUser();
    console.log("user in checkout");
    console.log(user);
    this.handler.open({
      name: 'Fireship Store',
      description: this.description,
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

  signInAnonymously(){
    this.auth.signInAnonymously();
    const user = this.auth.getUser().then(result =>{
      console.log("result of promise from auth get User call:");
      console.log(result);
      if(result){
        this.localLoggedInStatus = true;
      } else{
        this.localLoggedInStatus = false;
      }
    });
  }

}
