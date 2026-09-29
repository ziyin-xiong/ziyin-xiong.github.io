---
layout: page
title: Symmetry Regularization for Quadruped Locomotion
description: Learning faster and more stable locomotion through structured motion priors.
importance: 3
category: robot-learning
github: https://github.com/ziyin-xiong/Go1-Locomotion
---

<div class="locomotion-study">
  <header class="locomotion-intro">
    <p class="locomotion-kicker">UC Berkeley · Locomotion · Reinforcement Learning · Symmetry in Motion
    <p class="locomotion-deck">
      Can a quadruped learn fast, stable locomotion more efficiently when its reward reflects the symmetries already present in animal motion? This project studies structured regularization for coordinated gait learning without prescribing a single fixed gait.
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
    <div><strong>4,096</strong><span>Parallel Environments</span></div>
    <div><strong>Up To 5 m/s</strong><span>Longitudinal Command Speed</span></div>
    <div><strong>6.5K</strong><span>Iterations Per Ablation</span></div>
    <div><strong>4</strong><span>Symmetry Families</span></div>
  </div>

  <section class="locomotion-section locomotion-question">
    <div class="locomotion-section-label">01 · Motivation</div>
    <div>
      <h2>The Question</h2>
      <p>
        Standard locomotion objectives can produce fast policies while leaving coordination to emerge implicitly. The resulting gait may track a command yet remain uneven across limbs or unstable at the edge of the training distribution. I investigated whether lightweight, physically meaningful symmetry terms could make coordination explicit while preserving the flexibility of reinforcement learning.
      </p>
    </div>
  </section>

  <section class="locomotion-section locomotion-method">
    <div class="locomotion-section-label">02 · Method</div>
    <div>
      <h2>Four Views Of Symmetry</h2>
      <p>
        Each objective compares motion that should agree under a particular transformation. Together they provide complementary structure across joint configuration, contact timing, and motion through time.
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
          <p>Aligns joint configurations for front-left/rear-right and front-right/rear-left pairs.</p>
        </div>
        <div>
          <span class="symmetry-index">B</span>
          <h3>Left-Right Timing</h3>
          <p>Balances air time and contact timing across mirrored limb pairs.</p>
        </div>
        <div>
          <span class="symmetry-index">C</span>
          <h3>Time Reversal</h3>
          <p>Encourages opposing joint velocities at corresponding lift-off and touchdown events.</p>
        </div>
        <div>
          <span class="symmetry-index">D</span>
          <h3>Mixed Gait</h3>
          <p>Lets the policy choose the lower-cost structure between trot-like and gallop-like coordination.</p>
        </div>
      </div>
    </div>

  </section>

  <section class="locomotion-section">
    <div class="locomotion-section-label">03 · Evaluation</div>
    <div>
      <h2>Ablating The Motion Prior</h2>
      <p>
        The study trains separate policies for the baseline and symmetry variants, then compares command tracking, stability, and learned gait structure across forward speeds. Training uses PPO in Isaac Gym with randomized friction, payload, gravity, motor strength, and control latency to keep the learned behavior from depending on a single nominal simulator.
      </p>
      <div class="locomotion-pipeline" aria-label="Evaluation pipeline">
        <div><span>01</span><strong>Train</strong><small>PPO + Domain Randomization</small></div>
        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        <div><span>02</span><strong>Sweep</strong><small>Baseline + Regularizers</small></div>
        <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        <div><span>03</span><strong>Measure</strong><small>Tracking + Stability</small></div>
      </div>
    </div>
  </section>

  <section class="locomotion-section locomotion-outcome">
    <div class="locomotion-section-label">04 · Outcome</div>
    <div>
      <h2>What The Study Established</h2>
      <p class="locomotion-outcome-lead">
        The experiments show that adding the right symmetry prior can improve high-speed command tracking and stabilize coordinated motion, while keeping the policy free to adapt its gait across the velocity range.
      </p>
      <ul class="locomotion-takeaways">
        <li><strong>Structure without a reference trajectory.</strong> The policy receives relational motion constraints rather than a prescribed joint sequence.</li>
        <li><strong>Several symmetries, one test bed.</strong> Diagonal, bilateral, temporal, and mixed-gait objectives are isolated under the same training setup.</li>
        <li><strong>Stress-tested learning.</strong> A wide command range and randomized dynamics evaluate more than nominal-speed behavior.</li>
      </ul>
    </div>
  </section>
</div>
