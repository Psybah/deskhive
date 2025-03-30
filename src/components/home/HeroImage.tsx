
import React from "react";

const HeroImage = () => {
  return (
    <div className="relative">
      <div className="glass-card rounded-xl p-4">
        <div className="aspect-[16/9] bg-gradient-to-br from-deskhive-navy/90 to-deskhive-royal rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 opacity-20 bg-[url('/lovable-uploads/e4637799-cdf0-41b0-af2b-8393e9f28fe0.png')] bg-center bg-no-repeat bg-contain"></div>
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <h3 className="text-white text-xl font-bold mb-2">Seamless Workspace Management</h3>
            <p className="text-white/80 text-sm mb-4">
              Book, manage, and optimize your workspaces with ease
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-md p-3 flex flex-col items-center justify-center">
                <div className="text-white text-lg font-bold">100+</div>
                <div className="text-white/70 text-xs text-center">Companies</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-md p-3 flex flex-col items-center justify-center">
                <div className="text-white text-lg font-bold">30+</div>
                <div className="text-white/70 text-xs text-center">Spaces</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-md p-3 flex flex-col items-center justify-center">
                <div className="text-white text-lg font-bold">15+</div>
                <div className="text-white/70 text-xs text-center">Locations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-deskhive-orange/20 backdrop-blur-sm rounded-2xl -z-10"></div>
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-deskhive-navy/20 backdrop-blur-sm rounded-2xl -z-10"></div>
    </div>
  );
};

export default HeroImage;
