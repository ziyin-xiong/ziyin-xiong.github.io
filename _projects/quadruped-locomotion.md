---
layout: page
title: Symmetry Regularization for Quadruped Locomotion
description: Symmetry rewards, curriculum training, and sim-to-real evaluation for quadruped locomotion.
importance: 3
category: robot-learning
github: https://github.com/ziyin-xiong/Go1-Locomotion
---

<div class="locomotion-study">
  <header class="locomotion-intro">
    <p class="locomotion-kicker">UC Berkeley · Locomotion · Reinforcement Learning · Symmetry in Motion</p>
    <p class="locomotion-deck">
      Can symmetry priors improve high-speed tracking without damaging a quadruped's gait at everyday speeds? I tested reward terms and a mirror-policy loss across A1 and Go1 simulation, then evaluated selected policies on a real Go1.
    </p>
    <div class="locomotion-actions" aria-label="Project links">
      <a class="locomotion-action" href="https://github.com/ziyin-xiong/Go1-Locomotion" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-github" aria-hidden="true"></i>
        Code
      </a>
    </div>
  </header>

  <figure class="locomotion-media">
    <video autoplay muted loop playsinline controls preload="metadata" poster="{{ '/assets/img/projects/locomotion/simulation-poster.jpg' | relative_url }}" aria-label="Unitree Go1 simulation rollout">
      <source src="{{ '/assets/video/projects/quadruped-locomotion.mp4' | relative_url }}" type="video/mp4">
    </video>
    <figcaption>Evaluation rollout from the Go1 simulation and policy-training stack used in this project.</figcaption>
  </figure>

  <div class="locomotion-facts" aria-label="Experiment setup">
    <div><strong>A1 + Go1</strong><span>Simulation Platforms</span></div>
    <div><strong>200 + 1,300</strong><span>Curriculum Iterations</span></div>
    <div><strong>2 / 6.6</strong><span>Checkpoint Videos, m/s</span></div>
    <div><strong>Real Go1</strong><span>Hardware Evaluation</span></div>
  </div>

  <section class="locomotion-section locomotion-question">
    <div class="locomotion-section-label">01 · Motivation</div>
    <div>
      <h2>The Question</h2>
      <p>
        A policy can reach a high simulated speed yet move awkwardly at 2 m/s, or fail after transfer to hardware. The experiments therefore track three separate outcomes: maximum tested forward speed, the contact pattern at low and medium speeds, and whether the policy survives a real-world speed ramp.
      </p>
    </div>
  </section>

  <section class="locomotion-section locomotion-method">
    <div class="locomotion-section-label">02 · Method</div>
    <div>
      <h2>Motion Priors And Training</h2>
      <p>
        PPO policies were trained with randomized dynamics and evaluated through command sweeps and foot-contact plots. Reward ablations isolate four relations between limbs or motion phases; a separate mirror loss asks the policy to produce mirrored actions for mirrored observations.
      </p>

      <div class="symmetry-visual" role="img" aria-label="Top view of a quadruped showing diagonal and bilateral leg symmetries">
        <span class="symmetry-axis symmetry-axis-diagonal-a"></span>
        <span class="symmetry-axis symmetry-axis-diagonal-b"></span>
        <span class="symmetry-axis symmetry-axis-center"></span>
        <div class="symmetry-body">
          <span>Go1</span>
          <small>Top View</small>
        </div>
        <div class="symmetry-leg symmetry-leg-fl"><span>FL</span></div>
        <div class="symmetry-leg symmetry-leg-fr"><span>FR</span></div>
        <div class="symmetry-leg symmetry-leg-rl"><span>RL</span></div>
        <div class="symmetry-leg symmetry-leg-rr"><span>RR</span></div>
        <span class="symmetry-direction">Motion</span>
      </div>

      <div class="symmetry-objectives">
        <div>
          <span class="symmetry-index">A</span>
          <h3>Diagonal Trot</h3>
          <p>Penalizes differences in joint positions between each diagonal pair, with speed-dependent weighting.</p>
        </div>
        <div>
          <span class="symmetry-index">B</span>
          <h3>Gallop</h3>
          <p>Tests rear-leg air-time and front/rear joint-configuration terms, alone and with trot.</p>
        </div>
        <div>
          <span class="symmetry-index">C</span>
          <h3>Time Reversal</h3>
          <p>Penalizes knee and calf velocities that fail to reverse between lift-off and touchdown.</p>
        </div>
        <div>
          <span class="symmetry-index">D</span>
          <h3>Left-Right Timing</h3>
          <p>Penalizes air-time differences between left and right front legs and between rear legs.</p>
        </div>
      </div>
    </div>

  </section>

  <section class="locomotion-section" id="a1-ablation">
    <div class="locomotion-section-label">03 · A1 Ablation</div>
    <div>
      <h2>Speed Is Only One Metric</h2>
      <p>In the initial 1,000-iteration A1 reward sweep, the baseline reached 5.3 m/s in simulation. Combining trot and gallop terms reached 6.3 m/s and produced a gallop; left-right timing reached 6.0 m/s, while some other variants had visibly poor or failing gaits. These are individual experiment records, not multi-seed averages.</p>
      <div class="locomotion-result-list" aria-label="A1 reward ablation, maximum tested forward speed">
        <div><span>Baseline</span><div><i style="width: 84%"></i></div><strong>5.3 m/s</strong></div>
        <div><span>Diagonal Trot</span><div><i style="width: 92%"></i></div><strong>5.8 m/s</strong></div>
        <div><span>Left-Right Timing</span><div><i style="width: 95%"></i></div><strong>6.0 m/s</strong></div>
        <div class="locomotion-result-highlight"><span>Trot + Gallop</span><div><i style="width: 100%"></i></div><strong>6.3 m/s</strong></div>
      </div>
      <p class="locomotion-note">A1, 1,000 training iterations. Bar lengths are relative to the fastest run in this sweep; gait quality was judged separately.</p>
    </div>
  </section>

  <section class="locomotion-section" id="curriculum-rollouts">
    <div class="locomotion-section-label">04 · Curriculum</div>
    <div>
      <h2>Checkpoint Rollouts Across Speed</h2>
      <p>The curriculum first trained for 200 iterations at a low-speed range, then continued for 1,300 iterations over the full command range. On A1, the baseline reached 6.0 m/s, time reversal 6.6 m/s, and left-right timing 6.7 m/s. The latter two-speed advantage came with a tradeoff: the notes flag poor low-speed gaits for left-right timing and its combination with time reversal.</p>
      <div class="locomotion-result-list" aria-label="A1 curriculum maximum tested forward speed">
        <div><span>Baseline</span><div><i style="width: 90%"></i></div><strong>6.0 m/s</strong></div>
        <div><span>Time Reversal</span><div><i style="width: 99%"></i></div><strong>6.6 m/s</strong></div>
        <div class="locomotion-result-highlight"><span>Left-Right Timing</span><div><i style="width: 100%"></i></div><strong>6.7 m/s</strong></div>
        <div><span>Both Terms</span><div><i style="width: 99%"></i></div><strong>6.6 m/s</strong></div>
      </div>
      <p class="locomotion-note">The 2 and 6.6 m/s videos below are rollouts of the same time-reversal + left-right curriculum checkpoint. The 6.6 m/s time-reversal-only clip is a different checkpoint. The export labels a second copy of the 2 m/s file as 4 m/s, so it is omitted here.</p>
      <div class="locomotion-demo-grid">
        <figure class="locomotion-demo">
          <video controls muted playsinline preload="none" poster="{{ '/assets/img/projects/locomotion/notion/a1-curriculum-mixed-2.jpg' | relative_url }}" aria-label="A1 curriculum checkpoint rollout at 2 meters per second"><source src="{{ '/assets/video/projects/locomotion/a1-curriculum-mixed-2.mp4' | relative_url }}" type="video/mp4"></video>
          <figcaption><strong>2.0 m/s</strong><span>Combined Terms · Low-Speed Gait</span></figcaption>
        </figure>
        <figure class="locomotion-demo">
          <video controls muted playsinline preload="none" poster="{{ '/assets/img/projects/locomotion/notion/a1-curriculum-mixed-6-6.jpg' | relative_url }}" aria-label="A1 curriculum checkpoint rollout at 6.6 meters per second"><source src="{{ '/assets/video/projects/locomotion/a1-curriculum-mixed-6-6.mp4' | relative_url }}" type="video/mp4"></video>
          <figcaption><strong>6.6 m/s</strong><span>Combined Terms · High Speed</span></figcaption>
        </figure>
        <figure class="locomotion-demo">
          <video controls muted playsinline preload="none" poster="{{ '/assets/img/projects/locomotion/notion/a1-curriculum-time.jpg' | relative_url }}" aria-label="A1 time reversal curriculum checkpoint rollout at 6.6 meters per second"><source src="{{ '/assets/video/projects/locomotion/a1-curriculum-time.mp4' | relative_url }}" type="video/mp4"></video>
          <figcaption><strong>6.6 m/s</strong><span>Time Reversal Only · Trot</span></figcaption>
        </figure>
      </div>
      <details class="locomotion-extra">
        <summary>Baseline Curriculum Rollout · 6.0 m/s</summary>
        <figure class="locomotion-demo">
          <video controls muted playsinline preload="none" poster="{{ '/assets/img/projects/locomotion/notion/a1-curriculum-baseline.jpg' | relative_url }}" aria-label="A1 baseline curriculum checkpoint rollout at 6 meters per second"><source src="{{ '/assets/video/projects/locomotion/a1-curriculum-baseline.mp4' | relative_url }}" type="video/mp4"></video>
          <figcaption><strong>6.0 m/s</strong><span>No Symmetry Reward · Trot</span></figcaption>
        </figure>
      </details>
      <figure class="locomotion-chart">
        <img src="{{ '/assets/img/projects/locomotion/notion/a1-curriculum-time-clean.png' | relative_url }}" alt="A1 time-reversal curriculum run: contact timing and commanded versus measured velocity at 2, 4, and 6.6 meters per second" loading="lazy">
        <div class="locomotion-chart-legend" aria-label="Velocity plot legend"><span class="locomotion-chart-measured">Measured Velocity</span><span class="locomotion-chart-commanded">Commanded Velocity</span></div>
        <figcaption>Time-reversal curriculum checkpoint: foot contacts and tracking across the three tested commands. Overprinted labels were removed from the original plot.</figcaption>
      </figure>
    </div>
  </section>

  <section class="locomotion-section" id="mirror-loss">
    <div class="locomotion-section-label">05 · Mirror Loss</div>
    <div>
      <h2>Low-Speed Gait Matters</h2>
      <p>A mirror-policy loss compares the action from an observation with the mirrored action from its reflected observation. In one A1 run, loss scale 1.5 yielded a more regular trot at 2 and 4 m/s without a low-speed curriculum; the unmodified run sometimes barely placed a foot. The records also warn that baseline outcomes varied, so this is a qualitative comparison, not a robustness claim.</p>
      <div class="locomotion-demo-grid">
        <figure class="locomotion-demo">
          <video controls muted playsinline preload="none" poster="{{ '/assets/img/projects/locomotion/notion/a1-mirror-baseline-2.jpg' | relative_url }}" aria-label="A1 baseline rollout without curriculum at 2 meters per second"><source src="{{ '/assets/video/projects/locomotion/a1-mirror-baseline-2.mp4' | relative_url }}" type="video/mp4"></video>
          <figcaption><strong>Baseline · 2.0 m/s</strong><span>No Curriculum</span></figcaption>
        </figure>
        <figure class="locomotion-demo">
          <video controls muted playsinline preload="none" poster="{{ '/assets/img/projects/locomotion/notion/a1-mirror-1-5-2.jpg' | relative_url }}" aria-label="A1 mirror loss rollout at 2 meters per second"><source src="{{ '/assets/video/projects/locomotion/a1-mirror-1-5-2.mp4' | relative_url }}" type="video/mp4"></video>
          <figcaption><strong>Mirror Loss 1.5 · 2.0 m/s</strong><span>No Curriculum</span></figcaption>
        </figure>
      </div>
      <figure class="locomotion-chart">
        <img src="{{ '/assets/img/projects/locomotion/notion/a1-mirror-1-5-clean.png' | relative_url }}" alt="A1 mirror loss run: contact timing and commanded versus measured velocity at 2, 4, and 6.2 meters per second" loading="lazy">
        <div class="locomotion-chart-legend" aria-label="Velocity plot legend"><span class="locomotion-chart-measured">Measured Velocity</span><span class="locomotion-chart-commanded">Commanded Velocity</span></div>
        <figcaption>Contact timing and speed tracking for the mirror-loss run at 2, 4, and 6.2 m/s. Overprinted labels were removed from the original plot.</figcaption>
      </figure>
      <p class="locomotion-note">Higher mirror-loss weight reached 6.6 m/s in another run, but the notes describe a poorer tapping gait at low speed. More regular motion and peak speed did not always move together.</p>
    </div>
  </section>

  <section class="locomotion-section" id="go1-simulation">
    <div class="locomotion-section-label">06 · Go1 Simulation</div>
    <div>
      <h2>Testing The Same Idea On Go1</h2>
      <p>In the full-observation Go1 comparison, each policy trained for 1,500 iterations with a 5.0 m/s training command. The recorded maximum tested speeds were 5.2 m/s for the baseline, 5.8 m/s with time reversal, and 6.0 m/s with left-right reward plus mirror loss. All three were described as trotting at low and maximum speeds. These simulated speeds should not be read as hardware results.</p>
      <div class="locomotion-result-list" aria-label="Go1 simulation maximum tested forward speed">
        <div><span>Baseline</span><div><i style="width: 87%"></i></div><strong>5.2 m/s</strong></div>
        <div><span>Time Reversal</span><div><i style="width: 97%"></i></div><strong>5.8 m/s</strong></div>
        <div class="locomotion-result-highlight"><span>Left-Right + Mirror</span><div><i style="width: 100%"></i></div><strong>6.0 m/s</strong></div>
      </div>
      <div class="locomotion-demo-grid">
        <figure class="locomotion-demo">
          <video controls muted playsinline preload="none" poster="{{ '/assets/img/projects/locomotion/notion/go1-baseline-5-2.jpg' | relative_url }}" aria-label="Go1 simulation baseline rollout at 5.2 meters per second"><source src="{{ '/assets/video/projects/locomotion/go1-baseline-5-2.mp4' | relative_url }}" type="video/mp4"></video>
          <figcaption><strong>Baseline · 5.2 m/s</strong><span>Full Observation</span></figcaption>
        </figure>
        <figure class="locomotion-demo">
          <video controls muted playsinline preload="none" poster="{{ '/assets/img/projects/locomotion/notion/go1-time-5-8.jpg' | relative_url }}" aria-label="Go1 simulation time reversal rollout at 5.8 meters per second"><source src="{{ '/assets/video/projects/locomotion/go1-time-5-8.mp4' | relative_url }}" type="video/mp4"></video>
          <figcaption><strong>Time Reversal · 5.8 m/s</strong><span>Full Observation</span></figcaption>
        </figure>
        <figure class="locomotion-demo">
          <video controls muted playsinline preload="none" poster="{{ '/assets/img/projects/locomotion/notion/go1-left-mirror-6.jpg' | relative_url }}" aria-label="Go1 simulation left-right reward and mirror loss rollout at 6 meters per second"><source src="{{ '/assets/video/projects/locomotion/go1-left-mirror-6.mp4' | relative_url }}" type="video/mp4"></video>
          <figcaption><strong>Left-Right + Mirror · 6.0 m/s</strong><span>Full Observation</span></figcaption>
        </figure>
      </div>
      <figure class="locomotion-chart">
        <img src="{{ '/assets/img/projects/locomotion/notion/go1-left-mirror.png' | relative_url }}" alt="Go1 full-observation left-right reward and mirror-loss policy: speed tracking and foot contacts at 2, 4, and 6 meters per second" loading="lazy">
        <figcaption>Go1 left-right reward plus mirror loss: command tracking and foot contacts at 2, 4, and 6 m/s. Original experiment plot.</figcaption>
      </figure>
      <details class="locomotion-extra">
        <summary>Compare Baseline And Time-Reversal Contact Plots</summary>
        <figure class="locomotion-chart">
          <img src="{{ '/assets/img/projects/locomotion/notion/go1-baseline.png' | relative_url }}" alt="Go1 baseline speed tracking and foot contacts at 2, 4, and 5.2 meters per second" loading="lazy">
          <figcaption>Go1 baseline: 2, 4, and 5.2 m/s.</figcaption>
        </figure>
        <figure class="locomotion-chart">
          <img src="{{ '/assets/img/projects/locomotion/notion/go1-time.png' | relative_url }}" alt="Go1 time-reversal speed tracking and foot contacts at 2, 4, and 5.8 meters per second" loading="lazy">
          <figcaption>Go1 time reversal: 2, 4, and 5.8 m/s.</figcaption>
        </figure>
      </details>
    </div>
  </section>

  <section class="locomotion-section" id="hardware">
    <div class="locomotion-section-label">07 · Hardware</div>
    <div>
      <h2>What Transferred To The Real Robot</h2>
      <p>Real-Go1 trials were much slower than full-observation simulation and exposed failures the simulated peak-speed numbers did not capture. A July 19 policy reached about 10.7 km/h at a 3.5 m/s command but fell at a 4.0 m/s command. With a 0.4 m/s² ramp on July 26, a diagonal-reward policy reached about 11 km/h; gallop and time-reversal variants fell before 10 km/h. An August trot-policy trial exceeded 12 km/h, while a later body-height adjustment improved its stance but did not exceed 12 km/h.</p>
      <div class="locomotion-demo-grid locomotion-hardware-demo-grid">
        <figure class="locomotion-demo">
          <video controls muted playsinline preload="none" poster="{{ '/assets/img/projects/locomotion/notion/hardware-diagonal.jpg' | relative_url }}" aria-label="Real Go1 diagonal-reward policy hardware speed ramp"><source src="{{ '/assets/video/projects/locomotion/hardware/diagonal.mp4' | relative_url }}" type="video/mp4"></video>
          <figcaption><strong>Diagonal Policy</strong><span>July 26 · About 11 km/h</span></figcaption>
        </figure>
        <figure class="locomotion-demo">
          <video controls muted playsinline preload="none" poster="{{ '/assets/img/projects/locomotion/notion/hardware-bodyheight.jpg' | relative_url }}" aria-label="Real Go1 diagonal policy with adjusted body height"><source src="{{ '/assets/video/projects/locomotion/hardware/bodyheight.mp4' | relative_url }}" type="video/mp4"></video>
          <figcaption><strong>Body-Height Trial</strong><span>August 12 · Below 12 km/h</span></figcaption>
        </figure>
      </div>
      <figure class="locomotion-sensor-demo">
        <video controls muted playsinline preload="none" poster="{{ '/assets/img/projects/locomotion/notion/hardware-trot.jpg' | relative_url }}" aria-label="P-Gear speed measurement for the real Go1 trot policy"><source src="{{ '/assets/video/projects/locomotion/hardware/trot.mp4' | relative_url }}" type="video/mp4"></video>
        <figcaption>
          <strong>Trot Policy · P-Gear Measurement</strong>
          <span>The August 4 speed sweep recorded a 12.1 km/h maximum. This clip shows the instrument display rather than a camera view of the robot.</span>
        </figcaption>
      </figure>
      <div class="locomotion-hardware-links" aria-label="Hardware experiment videos">
        <a href="https://drive.google.com/file/d/1QinKFtTxgx7tgPHnYPoE-U4uUwqzsd8P/view?usp=sharing" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Original Diagonal Video</a>
        <a href="https://drive.google.com/file/d/1JMwBJNeF_7ZlCFyBjspDxt3U_1JCNogj/view?usp=sharing" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Original Trot Measurement</a>
        <a href="https://drive.google.com/file/d/1DuZte1NkYjGA7RHB2vr4gUFoWwjsAVpa/view?usp=sharing" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Original Body-Height Video</a>
      </div>
      <p class="locomotion-note">Embedded clips retain only the active test segments; the full recordings remain linked above. Hardware speeds are recorded in km/h; simulated evaluation speeds above are in m/s.</p>
    </div>
  </section>

  <section class="locomotion-section locomotion-outcome">
    <div class="locomotion-section-label">08 · Conclusion</div>
    <div>
      <h2>Where The Experiments Point</h2>
      <p class="locomotion-outcome-lead">Symmetry terms can improve a particular simulated speed sweep, but they are not a free, universal gain. Gait quality, observation design, command sampling, and hardware stability must be evaluated separately.</p>
      <ul class="locomotion-takeaways">
        <li><strong>Curriculum helped, but did not fix every gait.</strong> Left-right terms retained high-speed A1 performance while producing poor low-speed behavior in some checkpoints.</li>
        <li><strong>Policy symmetry is worth testing alongside reward symmetry.</strong> Moderate mirror loss produced a cleaner 2 m/s trot in one no-curriculum A1 run; stronger weighting traded that behavior away.</li>
        <li><strong>Simulation was not the final answer.</strong> Partial-observation runs were less stable, wider command sampling did not reliably raise top speed, and several fast-looking policies fell on hardware.</li>
      </ul>
      <p class="locomotion-note">Source: 2024 experiment log and its 14 subpages. Reported maxima are observations from individual runs, not statistical confidence estimates.</p>
    </div>
  </section>
</div>
