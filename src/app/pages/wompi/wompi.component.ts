import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-wompi',
  templateUrl: './wompi.component.html',
  styleUrls: ['./wompi.component.css']
})
export class WompiComponent implements OnInit {

  constructor(
    private changeDetector: ChangeDetectorRef
  ){
    // //* Creando el elemento script
    // const tag: HTMLScriptElement = document.createElement('script');

    // //* Configuracion del script
    // tag.src = "https://cdn.wompi.co/libs/js/v1.js";
    // tag.setAttribute('data-public-key','pub_test_6yyW32kanLvHapiEQyb9xUaMceaI26GC');

    // //* Anexando el script de CDN al HEAD para "Inicializar" la libreria
    // document.head.appendChild(tag);
  }

  ngOnInit(): void {
    const wompi = (window as any)['$wompi'];

    if( wompi ){
      wompi.initialize(function (data: any, error: any) {
        if (error === null) {
          var sessionId = data.sessionId;
          console.log('sessionID', sessionId);
        }
      });
    }
  }

  pay(){
    const widget = (window as any)['WidgetCheckout'];
    const now = DateTime.now().toFormat('yyyyLLddHHmmssms');
    console.log('@now',now);

    const checkout = new widget({
      currency: 'COP',
      amountInCents: 2490000,
      reference: `WP-RP-${now}`,
      publicKey: 'pub_test_6yyW32kanLvHapiEQyb9xUaMceaI26GC',
      redirectUrl: 'http://localhost:4200/wompi/transaction', // Opcional
    })

    checkout.open(function ( result: any ) {
      const transaction = result.transaction
      console.log('Transaction ID: ', transaction.id)
      console.log('Transaction object: ', transaction)
    })

  }

}
