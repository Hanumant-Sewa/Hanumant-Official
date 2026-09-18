import {
  Utensils,
  Recycle,
  CookingPot,
  ShoppingBasket,
  Ambulance,
  HandHeart,
  Users,
  Megaphone,
  ArrowRight,
} from "lucide-react";

import ProtectedButton from "./ProtectedButton";

function Programs() {
  const programs = [
    {
      icon: Utensils,
      title: "Food Distribution",
      text: "Providing nutritious meals to people and families who need support, with dignity and compassion.",
    },

    {
      icon: Recycle,
      title: "Food Rescue",
      text: "Helping reduce food waste by redirecting usable food toward communities where it can make a difference.",
    },

    {
      icon: CookingPot,
      title: "Community Kitchen",
      text: "Bringing volunteers together to prepare and serve fresh meals for people in need.",
    },

    {
      icon: ShoppingBasket,
      title: "Grocery Support",
      text: "Supporting families with essential groceries and food supplies when they need them most.",
    },

    {
      icon: Ambulance,
      title: "Emergency Relief",
      text: "Providing food and essential support during emergencies and difficult situations.",
    },

    {
      icon: HandHeart,
      title: "Community Care",
      text: "Supporting vulnerable communities through compassionate outreach and meaningful service.",
    },

    {
      icon: Users,
      title: "Volunteer Program",
      text: "Giving people opportunities to contribute their time, skills and energy to real community activities.",
    },

    {
      icon: Megaphone,
      title: "Awareness",
      text: "Creating awareness about food waste, hunger, nutrition and the importance of serving society.",
    },
  ];
  return (
    <section className="programs section" id="programs">
      <div className="container">
        {/* SECTION HEADER */}
        <div className="section-title">
          <span>OUR PROGRAMS</span>

          <h2>
            Turning Compassion Into <span>Meaningful Action</span>
          </h2>

          <p>
            Hanumat Seva brings people together through practical initiatives
            that support food security, community care, volunteering and
            emergency assistance.
          </p>
        </div>

        {/* PROGRAM GRID */}
        <div className="programs-grid">
          {programs.map((program, index) => {
            const Icon = program.icon;

            return (
              <div className="program-card" key={program.title}>
                {/* ICON */}
                <div className="program-icon">
                  <Icon size={32} strokeWidth={2} />
                </div>

                {/* NUMBER */}
                <span className="program-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{program.title}</h3>

                <p>{program.text}</p>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="programs-cta">
          <div>
            <span>BE PART OF THE CHANGE</span>

            <h3>
              Your time, support and compassion can become someone's hope.
            </h3>
          </div>

          <ProtectedButton
            to="/community"
            allowedRoles={["USER", "VOLUNTEER"]}
            className="programs-cta-btn"
          >
            Join Our Community
            <ArrowRight size={18} />
          </ProtectedButton>
        </div>
      </div>
    </section>
  );
}

export default Programs;
