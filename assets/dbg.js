$(document).ready(function () {
  $(".custom-slick-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    arrows: true,
    prevArrow:
      '<button type="button" class="slick-arrow slick-prev-arrow"><i class="fas fa-angle-left"></i></button>',
    nextArrow:
      '<button type="button" class="slick-arrow slick-next-arrow"><i class="fas fa-angle-right"></i></button>',
  });
  $(".brand_slick-slider-container").slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    dots: true,
    prevArrow: '<button type="button" class="brand_slick-prev"></button>',
    nextArrow: '<button type="button" class="brand_slick-next"></button>',
    appendDots: $(".brand_slick-slider-container"), // Ensure dots are custom
    customPaging: function (slider, i) {
      return "<button></button>";
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }); 
  
  
  if(localStorage.wishlist) {
    let wishlist = JSON.parse(localStorage.wishlist);
    for( let i = 0 ; i < wishlist.length ; i ++ ) {
      let productID = wishlist[i].id;
      wishlist_product = $(`#wishlist-icon-${productID}`).find('.hidden').text();
      if(wishlist_product){
        $(`#wishlist-icon-${productID}`).addClass("wishlist-active");
      }
    }
  } 
});
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".header__inline-menu");
  const allDetails = menu.querySelectorAll("details");

  allDetails.forEach((details) => {
    const summary = details.querySelector("summary");
    const dropdown = details.querySelector(".header__submenu");

    // Hover open/close logic
    details.addEventListener("mouseover", () => {
      details.setAttribute("open", true);
      document.activeElement?.blur();
    });

    details.addEventListener("mouseleave", () => {
      details.removeAttribute("open");
    });

    // Click handling for parent links
    summary.addEventListener("click", (e) => {
      if (details.hasAttribute("open")) {
        e.preventDefault();
        window.location.href = summary.querySelector("a").href;
      }
    });
    // Keep submenu interaction
    dropdown?.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });
});
$(document).on("click", ".default-search__button", function () {
  console.log("Search clicked test.");
  $(this).addClass("hidden");
  $(this).closest(".desktop-search").find(".search__input").focus();
});

$(document).on("click", ".wishlist-icon", function () {
  const product = $(this).find('.hidden').text();
  const productID = JSON.parse(product).id;
  if(localStorage.wishlist) {
    let wishlist = JSON.parse(localStorage.wishlist);
    let flog = true;
    for( let i = 0 ; i < wishlist.length ; i ++ ) {
      if( wishlist[i].id == productID ) {
        wishlist.splice(i, 1);
        $(`#wishlist-icon-${productID}`).removeClass("wishlist-active");        
        flog = false;
        break;
      }
    }
    if (flog) {
      console.log(productID);
      // let wishlist_array = wishlist.push(JSON.parse(product));
      wishlist.push(JSON.parse(product));     
      $(`#wishlist-icon-${productID}`).addClass("wishlist-active");
    }
    if(wishlist[0]){
      let wishlist_string = JSON.stringify(wishlist[0]);
      for( let i = 1 ; i < wishlist.length ; i ++ ) {
        wishlist_string = wishlist_string + ", " + JSON.stringify(wishlist[i]);
      }
      localStorage.wishlist = "[ " +  wishlist_string + " ]"; 
    } else {
      localStorage.wishlist = "";
    }
    
  } else {
    localStorage.wishlist = "[ " +  product + " ]";
    $(`#wishlist-icon-${productID}`).addClass("wishlist-active");  
  }  
});

const removeWishlist_byID = (id) => {
  let wishlist = JSON.parse(localStorage.wishlist);
  for( let i = 0 ; i < wishlist.length ; i ++ ) {
    if( wishlist[i].id == id ) {
      wishlist.splice(i, 1);
      $(".wishlist-icon").removeClass("wishlist-active");        
      flog = false;
      break;
    }
  }  
  if(wishlist[0]){
    let wishlist_string = JSON.stringify(wishlist[0]);
    for( let i = 1 ; i < wishlist.length ; i ++ ) {
      wishlist_string = wishlist_string + ", " + JSON.stringify(wishlist[i]);
    }
    localStorage.wishlist = "[ " +  wishlist_string + " ]"; 
  } else {
    localStorage.wishlist = "";
    $(".wishlist-body").addClass("wishlist__noitem");
    $('.wishlist-body').append(
      `        
        <h3>Your wishlist is empty</h3>        
        <div class="center collection__view-all">
          <a
            href="/collections/all"
            class="custom__view_all_button button"
            aria-label="View All Product"
          >
            Discover more
          </a>
        </div>
      `
    )
  }
  $(`#wishlist-card-${id}`).addClass("hidden");
}
