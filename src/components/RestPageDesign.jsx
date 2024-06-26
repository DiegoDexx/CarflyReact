import React from 'react';

export const RestPage = () => {
  return (
    <>
      <div className="content-container">
        <div className="row">
          <div className="col-md-6 container-img">
            
         <div className="col-md-6">
                  <img className="img1" src="./src/assets/img/car_rented.png"></img>
        </div>

          </div>
          <div className="col-md-6 text-content2">
          <hr className="text-content2__separator"></hr>
            <h1 className="text-content2__title">Alquila tu coche al mejor precio!</h1>
            <p className="text-content2__description">Nuestras recomendaciones y nuestra facilidad de brindará una experiencia en servicios de vehículos única!</p>
            <div className="text-content__separator"></div>
            <button className="bt3">Click Me</button>
          </div>
        </div>
      </div>
      {/* another banner */}
      <div className="content-container">
        {/* mover a la derecha */}
        
        <div className="row">
          <div className="col-md-6 text-content2 ">
          <hr className="text-content2__separator"></hr>
            <h1 className="text-content__title">Obten los mejores servicios!</h1>
            <p className="text-content__description">
              {/* Texto promocional sobre alquiler de coches */}
              ¡Descubre la libertad de la carretera con nuestro servicio de alquiler de coches con servicios increibles!
            </p>
            <button className="bt4">Click Me</button>
          </div>
          <div className="col-md-6 container-img">
            <div className="photo img3">
              <img src="./src/assets/img/taxi-app-concept.png" alt="Image 3" height="300px" width="400px" />
            </div>
          </div>
        </div>
      </div>

          {/* Haz un banner con boostrap y que sea responsive */}
    <section id="hero-banner" className="hero-banner">
    <div className="hero-banner-content">
        <h2>¡OBTEN LOS MEJORES DESCUENTOS DE HASTA 40% EN<span className='percent'> PLAN PREMIUM!</span> </h2>
        <p>¡Descubre  servicios increíbles al mejor precio!</p>
        <a href="#features" className="btn btn-primary">¡Averiguar!</a>
    </div>

    <img src="./src/assets/img/happy-delivery-guy-holding-box.jpg" alt="Delivery Guy" class="hero-banner-image" />

</section>

      {/* Haz una lista de ventajas con boostrap y que sean responsive */}
      <section id="features" className="content-container2">
      <div className="container">
        <div className="row">
          <div className="section-title text-center">
            <h2>¿PORQUE CARFLY?</h2>
            <img src="https://www.dropbox.com/s/1fxqvges3k4nav8/heart-section.png?raw=1" alt="heart-image" />     
          </div>   
        </div>
        <div className="row">
          <div className="col-md-4 custom-card"> 
            <div className="card">
              <div className="card-icon">
                <img className="img-responsive" src="https://www.dropbox.com/s/humhn4gzsribdeg/leaf-icon.png?raw=1" alt="leaf-icon" />
              </div>
              <div className="card-body">
                <h3 className="card-title">Variety of Vehicles</h3>
                <p className="card-text">Choose from a wide range of vehicles to suit your travel needs, from compact cars to SUVs and luxury vehicles.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 custom-card"> 
            <div className="card">
              <div className="card-icon">
                <img className="img-responsive" src="https://www.dropbox.com/s/4ktwr9t8u4cxics/pencil-icon.png?raw=1" alt="pencil-icon" />
              </div>
              <div className="card-body">
                <h3 className="card-title">Affordable Rates</h3>
                <p className="card-text">Enjoy competitive pricing and special deals on long-term rentals, making your travel budget-friendly.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 custom-card"> 
            <div className="card">
              <div className="card-icon">
                <img className="img-responsive" src="https://www.dropbox.com/s/e2fh98ar4sidn30/megaphone-icon.png?raw=1" alt="megaphone-icon" />
              </div>
              <div className="card-body">
                <h3 className="card-title">Convenient Locations</h3>
                <p className="card-text">With rental locations at major airports and cities, picking up and dropping off your rental car is hassle-free.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Fun facts  responsive */}
    <section id="facts" className="facts">
      <div className="container">
        <div className="row">
          <div className="section-title">
            <h2>NUESTROS LOGROS (Y TUYOS)</h2>
            <img src="https://www.dropbox.com/s/3e44unzq65x6pny/heart-section-w.png?raw=1" alt="heart-image" />
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-3 col-sm-3">
            <img src="https://www.dropbox.com/s/zf0is0tl5kqb2f1/clock-icon.png?raw=1" alt="Clock Icon" />
            <p className="hours">3200</p>
            <p className="hour-detail">DE HORAS DE ALQUILER</p>
          </div>
          <div className="col-md-3 col-sm-3">
            <img src="https://www.dropbox.com/s/sow7y5q8v9omeh6/clients-icon.png?raw=1" alt="Clients Icon" />
            <p className="hours">120</p>
            <p className="hour-detail">CLIENTES SATISFECHOS</p>
          </div>
          <div className="col-md-3 col-sm-3">
            <img src="https://www.dropbox.com/s/oj0z8pjs1anj9mw/rocket-icon.png?raw=1" alt="Rocket Icon" />
            <p className="hours">360</p>
            <p className="hour-detail">CPCHES ENTREGADOS</p>
          </div>
          <div className="col-md-3 col-sm-3">
            <img src="https://www.dropbox.com/s/sn74w5aehr8gr3t/award-icon.png?raw=1" alt="Award Icon" />
            <p className="hours">4.5/5</p>
            <p className="hour-detail">VALORACIÓN DE USUARIOS</p>
          </div>
        </div>
      </div>
    </section>



    

        {/* Haz un footer repsonsive con boostrap muy senicllo y adaptable */}
       


       
    </>
  );
}


