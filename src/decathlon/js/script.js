function getSelectedValue(name) {
    const radios = document.getElementsByName(name);
    for (const radio of radios) {
        if (radio.checked) return radio.value;
    }
    return null;
}

document.querySelector('input[type="button"]').addEventListener("click", () => {
    pts.pointsQCM = 0;

    const qcm1 = getSelectedValue("qcm1"); // Oui / Non
    const qcm2 = document.getElementById("qcm2").value; // Text input
    const qcm3 = getSelectedValue("qcm3"); // Oui / Non
    const qcm4 = getSelectedValue("qcm4"); // 0 / 1 / 2 / 3
    const qcm5 = getSelectedValue("qcm5"); // 1 / 2 / 3

    // Points calculation
    pts.pointsQCM += (qcm1 === "Oui") ? 30 : 10;
    pts.pointsQCM += (qcm3 === "Oui") ? 20 : 5;
    pts.pointsQCM += parseInt(qcm4 || 0) * 10; // frequency: 0→0pts, 1→10pts, 2→20pts, 3→30pts
    pts.pointsQCM += parseInt(qcm5 || 0) * 5;  // objective: 1→5pts, 2→10pts, 3→15pts

    const resultContainer = document.getElementsByClassName("resultat")[0];
    const result = document.createElement("div");
    resultContainer.innerHTML = '';
    result.innerHTML = `<p>Merci d'avoir répondu, Vous avez obtenu ${pts.pointsQCM} points !`;
    resultContainer.appendChild(result);


    const exercicesContainer = document.getElementsByClassName("exercices")[0];

    if (pts.pointsQCM <= 50){
        exercicesContainer.innerHTML = '';
        const exos = document.createElement("div");
        exos.innerHTML = `
                    <h3>Circuit pour les amateurs ou les futurs machines</h3>

                    <h4>Exercice 1 : Les pompes !</h4>

                  <figure>
                    <video controls muted>
                    <source  src="media/pompes.webm" type="video/webm"/>
                    </video>
                  </figure>

                   <h4>Exercice 2 : Les montées de genoux !</h4>

                  <figure>
                    <video controls muted>
                    <source  src="media/pompes.webm" type="video/webm" />
                    </video>
                  </figure>

                   <h4>Exercice 3 : Les montées de genoux !</h4>

                  <figure>
                    <video controls muted>
                    <source  src="media/pompes.webm" type="video/webm" />
                    </video>
                  </figure>

                    <h4>Exercice 4 : Les montées de genoux !</h4>

                  <figure>
                    <video controls muted>
                    <source  src="media/pompes.webm" type="video/webm" />
                    </video>
                  </figure>
            `;

        exercicesContainer.appendChild(exos);
    }

    else if (pts.pointsQCM > 50 && pts.pointsQCM <= 80){
        exercicesContainer.innerHTML = '';

        const exos = document.createElement("div");
        exos.innerHTML = `
                <h3>Circuit pour les intermédiaires, courage bienôt les sommets</h3>

                <h4>Exercice 1 : Les pompes !</h4>

                <figure>
                    <video controls muted>
                    <source  src=".webm" type="video/webm"/>
                </video>
            </figure>
                <aside>
                    <h3>Time</h3>
                </aside>
            <h4>Description</h4>
            <p>fesses allignées avec le reste du corps, les abdos gainés, bras pliés le long du corps, descendre bien bas. si trop difficile, se mettre a genoux</p>

            <h4>Exercice 2 : Les montées de genoux !</h4>

                <figure>
                    <video controls muted>
                    <source  src=".webm" type="video/webm" />
                    </video>
                </figure>
                
                <aside>
                    <h3>Time</h3>
                </aside>
                <h4>Description</h4>
                <p>montez vos genoux jusqu'à qu'ils soient pliés en angle droit, de facon rapide et dynamique en alternant les jambes</p>

               <h4>Exercice 3 : Les squats !</h4>

            <figure>
                <video controls muted>
                    <source  src=".webm" type="video/webm" />
                </video>
            </figure>
                    
            <aside>
                <h3>Time</h3>
            </aside>
            <h4>Description</h4>
            <p>gardez le dos droit lorsque vous descendez, genoux pliés en angle droit, abdos gainés, regardez droit devant vous</p>

            <h4>Exercice 4 : Les jumping jacks !</h4>

              <figure>
                <video controls muted>
                <source  src=".webm" type="video/webm" />
                </video>
              </figure>
                     
            <aside>
                <h3>Time</h3>
            </aside>
            <h4>Description</h4>
            <p>synchronisez vos bras et jambes.  les bras s'élèvent et les jambes s'écartent avant de revenir à leur position initiale.</p>

            <h4>Exercice 5 : Le rameur !</h4>

              <figure>
                <video controls muted>
                    <source  src=".webm" type="video/webm" />
                </video>
              </figure>
            <aside>
                <h3>Time</h3>
            </aside>
            <h4>Description</h4>
            <p>en position allongée, abdos gainés et seuls vos fesses touchent le sol, pas les pieds ! Puis ramenez bras et jambes comme si vous rammiez pour de vrai !</p>


            <h4>Exercice 6 : Les mountains climber !</h4>

              <figure>
                <video controls muted>
                    <source  src=".webm" type="video/webm" />
                </video>
              </figure>
            
              <aside>
                <h3>Time</h3>
            </aside>
            <h4>Description</h4>
            <p>mettez vous en position de pompe haute puis ramener vos genoux en alternant les 2 jambes comme si vous grimpiez.</p>
            </section>
            `;

        exercicesContainer.appendChild(exos);
    }

    else if (pts.pointsQCM > 80){
        exercicesContainer.innerHTML = '';

        const exos = document.createElement("div");
        exos.innerHTML = `
             <h3>Circuit pour les experts, les cyborg</h3>

                <h4>Exercice 1 : Les pompes !</h4>

                <figure>
                    <video controls muted>
                    <source  src=".webm" type="video/webm"/>
                </video>
            </figure>
                <aside>
                    <h3>Time</h3>
                </aside>
            <h4>Description</h4>
            <p>fesses allignées avec le reste du corps, les abdos gainés, bras pliés le long du corps, descendre bien bas. si trop difficile, se mettre a genoux</p>

            <h4>Exercice 2 : Les montées de genoux !</h4>

                <figure>
                    <video controls muted>
                    <source  src=".webm" type="video/webm" />
                    </video>
                </figure>
                
                <aside>
                    <h3>Time</h3>
                </aside>
                <h4>Description</h4>
                <p>montez vos genoux jusqu'à qu'ils soient pliés en angle droit, de facon rapide et dynamique en alternant les jambes</p>

               <h4>Exercice 3 : Les squats !</h4>

            <figure>
                <video controls muted>
                    <source  src=".webm" type="video/webm" />
                </video>
            </figure>
                    
            <aside>
                <h3>Time</h3>
            </aside>
            <h4>Description</h4>
            <p>gardez le dos droit lorsque vous descendez, genoux pliés en angle droit, abdos gainés, regardez droit devant vous</p>

            <h4>Exercice 4 : Les jumping jacks !</h4>

              <figure>
                <video controls muted>
                <source  src=".webm" type="video/webm" />
                </video>
              </figure>
                     
            <aside>
                <h3>Time</h3>
            </aside>
            <h4>Description</h4>
            <p>synchronisez vos bras et jambes.  les bras s'élèvent et les jambes s'écartent avant de revenir à leur position initiale.</p>

            <h4>Exercice 5 : Le rameur !</h4>

              <figure>
                <video controls muted>
                    <source  src=".webm" type="video/webm" />
                </video>
              </figure>
            <aside>
                <h3>Time</h3>
            </aside>
            <h4>Description</h4>
            <p>en position allongée, abdos gainés et seuls vos fesses touchent le sol, pas les pieds ! Puis ramenez bras et jambes comme si vous rammiez pour de vrai !</p>


            <h4>Exercice 6 : Les mountains climber !</h4>

              <figure>
                <video controls muted>
                    <source  src=".webm" type="video/webm" />
                </video>
              </figure>
            
              <aside>
                <h3>Time</h3>
            </aside>
            <h4>Description</h4>
            <p>mettez vous en position de pompe haute puis ramener vos genoux en alternant les 2 jambes comme si vous grimpiez.</p>


            <h4>Exercice 7 : Les abdos !</h4>

              <figure>
                <video controls muted>
                    <source  src=".webm" type="video/webm" />
                </video>
              </figure>
            
              <aside>
                <h3>Time</h3>
            </aside>
            <h4>Description</h4>
            <p>en position allongée, genoux pliés, sans bouger le reste du corps, relevez votre bustre en gainant jusqu'à vos genoux</p>


            <h4>Exercice 8 : Les burpees !</h4>

              <figure>
                <video controls muted>
                    <source  src=".webm" type="video/webm" />
                </video>
              </figure>
            
              <aside>
                <h3>Time</h3>
            </aside>
            <h4>Description</h4>
            <p>exécutez une pompe rapidement mais bien faite, puis en se relever en rammenant ses genoux et pieds, puis faire une extension vers le haut
</p>
            `;

        exercicesContainer.appendChild(exos);
    }
});
