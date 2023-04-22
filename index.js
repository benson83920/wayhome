$(document).ready(function () {
    let allItem = [];
    function addInput() {
        const inputHtml = `
          <div class="col-md-5">
              <label for="name" class="col-form-label">名稱</label>
              <div class="col-sm-10">
                  <input type="text" class="form-control name" required />
              </div>
          </div>
          <div class="col-md-5">
              <label for="quantity" class="col-form-label">數量</label>
              <div class="input-group">
                  <input
                      type="number"
                      class="form-control quantity"
                      required
                  />
                  <div class="input-group-append">
                      <button class="btn btn-primary plus" type="button">
                          <i class="fa fa-plus"></i>
                      </button>
                      <button
                          style="color: aliceblue"
                          class="btn btn-danger delete"
                          type="button"
                      >
                          <i class="fa fa-trash"></i>
                      </button>
                  </div>
              </div>
          </div>
      `;
        $(inputHtml).insertBefore("#submit");
        $(".plus").off("click").on("click", addInput);
        $(".delete").off("click").on("click", deleteInput);
    }

    function deleteInput() {
        $(this).closest(".col-md-5").prev().remove();
        $(this).closest(".col-md-5").remove();
    }

    function sum() {
        const names = [];
        const quantities = [];

        // 遍历每个class为"name"的输入框，并将其值存储在数组中
        $(".name").each(function () {
            var nameValue = $(this).val();
            names.push(nameValue);
        });

        // 遍历每个class为"quantity"的输入框，并将其值存储在数组中
        $(".quantity").each(function () {
            var quantityValue = $(this).val();
            quantities.push(quantityValue);
        });
        return { names, quantities };
    }

    function pickUpThreeItem(e) {
        e.preventDefault();
        const { names, quantities } = sum();
        const selectedItems = [];
        for (let i = 0; i < names.length; i++) {
            for (let j = 0; j < Number(quantities[i]); j++) {
                allItem.push(names[i]);
            }
        }

        const newAllItem = [...allItem];
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * newAllItem.length);
            const selectedItem = newAllItem.splice(randomIndex, 1)[0];
            selectedItems.push(selectedItem);
        }
        $(".list-group-item").each(function (index) {
            $(this).text(selectedItems[index]);
        });
        $(this).prop("disabled", true);
    }

    function rePickUpThreeItem(e) {
        e.preventDefault();
        $(".list-group-item").each(function () {
            $(this).text("");
            $(this).prop("disabled", false);
        });
        $(".user_choice").text("你所選擇的東西為：");
        const { names, quantities } = sum();
        const selectedItems = [];
        for (let i = 0; i < names.length; i++) {
            for (let j = 0; j < Number(quantities[i]); j++) {
                allItem.push(names[i]);
            }
        }

        const newAllItem = [...allItem];
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * newAllItem.length);
            const selectedItem = newAllItem.splice(randomIndex, 1)[0];
            selectedItems.push(selectedItem);
        }
        $(".list-group-item").each(function (index) {
            $(this).text(selectedItems[index]);
        });
    }

    function user_choose() {
        $(".user_choice").text($(".user_choice").text() + $(this).text() + " ");
        const itemIndex = allItem.indexOf($(this).text());
        if (itemIndex !== -1) {
            allItem.splice(itemIndex, 1);
        }

        const newAllItem = [...allItem];
        const selectedItems = [];
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * newAllItem.length);
            const selectedItem = newAllItem.splice(randomIndex, 1)[0];
            selectedItems.push(selectedItem);
        }
        $(".list-group-item").each(function (index) {
            $(this).text(selectedItems[index]);
        });
        if (allItem.length < 3) {
            $(".list-group-item").each(function () {
                $(this).text("");
                $(this).prop("disabled", true);
            });
            alert("剩下不到3個");
        }

        console.log(allItem);
    }

    $(".plus").on("click", addInput);
    $(".delete").on("click", deleteInput);
    $("#submit .btn-primary").on("click", pickUpThreeItem);
    $("#submit .btn-secondary").on("click", rePickUpThreeItem);
    $(".list-group-item").click(user_choose);
});
