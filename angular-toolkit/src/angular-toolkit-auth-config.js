(function () {
    'use strict';

    //module just to be called for wellknown openId providers
    var module = angular.module('angular-toolkit-auth-config', ['angular-toolkit-auth']);

    module.config(function (openIdProvider) {
        openIdProvider.config(TTOpenIdConfig);
        openIdProvider.config(googleOpenIdConfig);
        openIdProvider.config(salesForceOpenIdConfig);
    }); 

    var TTKeys = '{"keys":[{"kty":"RSA","use":"sig","kid":"a3rMUgMFv9tPclLa6yF3zAkfquE","x5t":"a3rMUgMFv9tPclLa6yF3zAkfquE","e":"AQAB","n":"qnTksBdxOiOlsmRNd-mMS2M3o1IDpK4uAr0T4_YqO3zYHAGAWTwsq4ms-NWynqY5HaB4EThNxuq2GWC5JKpO1YirOrwS97B5x9LJyHXPsdJcSikEI9BxOkl6WLQ0UzPxHdYTLpR4_O-0ILAlXw8NU4-jB4AP8Sn9YGYJ5w0fLw5YmWioXeWvocz1wHrZdJPxS8XnqHXwMUozVzQj-x6daOv5FmrHU1r9_bbp0a1GLv4BbTtSh4kMyz1hXylho0EvPg5p9YIKStbNAW9eNWvv5R8HN7PPei21AsUqxekK0oW9jnEdHewckToX7x5zULWKwwZIksll0XnVczVgy7fCFw","x5c":["MIIDBTCCAfGgAwIBAgIQNQb+T2ncIrNA6cKvUA1GWTAJBgUrDgMCHQUAMBIxEDAOBgNVBAMTB0RldlJvb3QwHhcNMTAwMTIwMjIwMDAwWhcNMjAwMTIwMjIwMDAwWjAVMRMwEQYDVQQDEwppZHNydjN0ZXN0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqnTksBdxOiOlsmRNd+mMS2M3o1IDpK4uAr0T4/YqO3zYHAGAWTwsq4ms+NWynqY5HaB4EThNxuq2GWC5JKpO1YirOrwS97B5x9LJyHXPsdJcSikEI9BxOkl6WLQ0UzPxHdYTLpR4/O+0ILAlXw8NU4+jB4AP8Sn9YGYJ5w0fLw5YmWioXeWvocz1wHrZdJPxS8XnqHXwMUozVzQj+x6daOv5FmrHU1r9/bbp0a1GLv4BbTtSh4kMyz1hXylho0EvPg5p9YIKStbNAW9eNWvv5R8HN7PPei21AsUqxekK0oW9jnEdHewckToX7x5zULWKwwZIksll0XnVczVgy7fCFwIDAQABo1wwWjATBgNVHSUEDDAKBggrBgEFBQcDATBDBgNVHQEEPDA6gBDSFgDaV+Q2d2191r6A38tBoRQwEjEQMA4GA1UEAxMHRGV2Um9vdIIQLFk7exPNg41NRNaeNu0I9jAJBgUrDgMCHQUAA4IBAQBUnMSZxY5xosMEW6Mz4WEAjNoNv2QvqNmk23RMZGMgr516ROeWS5D3RlTNyU8FkstNCC4maDM3E0Bi4bbzW3AwrpbluqtcyMN3Pivqdxx+zKWKiORJqqLIvN8CT1fVPxxXb/e9GOdaR8eXSmB0PgNUhM4IjgNkwBbvWC9F/lzvwjlQgciR7d4GfXPYsE1vf8tmdQaY8/PtdAkExmbrb9MihdggSoGXlELrPA91Yce+fiRcKY3rQlNWVd4DOoJ/cPXsXwry8pWjNCo5JD8Q+RQ5yZEy7YPoifwemLhTdsBz3hlZr28oCGJ3kbnpW0xGvQb3VHSTVVbeei0CfXoW6iz1"]}]}'; // jshint ignore:line


    var TTOpenIdConfig = {
        authority_endpoint: 'https://localhost:44333',
        keys: TTKeys
    };

    var googleKeys = '{keys:[{kty:"RSA",alg:"RS256",use:"sig",kid:"de95593a55348d6f43d999e8014ade3f20e54982",n:"7pWc6CbDP_DQ2slLRP3TAtJ9bJ2YxZHq1_GmvVUIM0y6uUckm39dk6Wkez5P5WwEH5XS5eUAuXG7l5Wb6lg6NCLq5-DoYErbA8tlNOe2wT4WkEASCamDyZr7U4bTkYuk3nXZtbpIY5gNt7V0PTZrdzpPrJrGSjiexk02lgMiOD8=",e:"AQAB"},{kty:"RSA",alg:"RS256",use:"sig",kid:"84a5738e82f54b59ac5b77c319ed91ca7157b464",n:"pHz0_grev1C6S3uYVEbxdYQgP0SEVkk-2qxaXFWWylpn15bAVb8Mbjno2faawQPvubWN4-JARNOMTHkrq7Y8mmlN6SPxlVRWxXvoLWQVSx1FndNv4JQ7xeoBIm9bTwnsmFHYU7uM1g6v23whTQPk6ruo9u-sW2NRpThR30pCEGE=",e:"AQAB"}]};'; // jshint ignore:line

    // Google openid config
    var googleOpenIdConfig = {
        issuer: 'accounts.google.com',
        authorization_endpoint: 'https://accounts.google.com/o/oauth2/auth',
        token_endpoint: 'https://www.googleapis.com/oauth2/v3/token',
        userinfo_endpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
        revocation_endpoint: 'https://accounts.google.com/o/oauth2/revoke',
        jwks_uri: 'https://www.googleapis.com/oauth2/v2/certs',
        redirect_uri: 'http://localhost:8000/demoApp/callback.html',
        keys: googleKeys
    };



    var salesforceKeys = '{"keys":[{"kty":"RSA","n":"wIQtK09qsu1qCCQu1mHh6d_EyyOlbqMCV8WMacOyhZng1sbaFJY-0PIH46Kw1uhjbHg94_r2UELYd30vF8xwViGhCmpPuSGhkxNoT5CMoJPS6JW-zBpR7suHqBUnaGdZ6G2uYZDpwWYs_4SJDuWzxVBrQqIM_ZVgUqutniQPmjMAX5MqznBTnG3zm728BmNzS7T2gtzxs3jAgDsSAu3Kxp3D6NDGERhaAJ8jOgwHvmQK5xFi9Adw7sv2nCH-wM-C5fLJYmpGOSrTP1HLOlq--TROAvWL9gcNEeq4arryIYux5syg66rHT8U2Uhb1PdXt7ReQY8wBnP2BBH1QH7rzOZ7UbqFLbQUQsZFAVMcfm7gJN8JWLlcSJZdC2zaY0wI5q8PWN-N_GgAK64FKZQ7pB0bRQ5AQx-D3U4sYE4EcgSvV8fW86PaF1VXaHMFcom48gZ1GzE_V25uPb-0yue0cv9lejrIKDvRiJ5UiyUPphro4Aw2ZcDi_8r8rqfglWhcnB4bGSri4kEBb_IdwvqKwRCqxlNdRnU1ooQeUBaVRwdbpj23Z1qtYjB55Wf2KOCJ6ewMyddq4bEAG6KIqPmssT7_exvygUyuW6qhnCV-gTZEwFI0A6djsHM5itfkzNY47BeuAtGXjuaRnVYIEvTrnSj3Lx7YfvCIiGqFrG6y31Ak","e":"AQAB","alg":"RS256","use":"sig","kid":"188"},{"kty":"RSA","n":"hsqiqMXZmxJHzWfZwbSffKfc9YYMxj83-aWhA91jtI8k-GMsEB6mtoNWLP6vmz6x6BQ8Sn6kmn65n1IGCIlWxhPn9yqfXBDBaHFGYED9bBloSEMFnnS9-ACsWrHl5UtDQ3nh-VQTKg1LBmjJMmAOHdBLoUikfpx8fjA1LfDn_1iNWnguj2ehgjWCuTn64UdUd84YNcfO8Ha0TAhWHOhkiluMyzGS0dtN0h8Ybyi5oL6Bf1sfhtOncUh1JuWMcmvICbGEkA_0vBbMp9nCvXdMlpzMOCIoYYkQ-25SRZ0GpIr_oBIZByEm1XaJIqNXoC7qJ95iAyWkUiSegY_IcBV3nMXr-kDNn9Vm2cgLEJGymOiDQKH8g7VjraCIrqWPD3DWv3Z6RsExs6i0gG3JU9cVVFwz87d05_yk3L5ubWb96uxsP9rkwZ3h8eJTfFrgMhk1ZwR-63Dk3ZLYisiAU0zKgr4vQ9qsCNPqDg0rkeqOY5k7Gy201_wh6Sw5dCNTTGmZZ1rNE-gyDu4-a1H40n8f2JFiH-xIOD9-w8HGYOu_oGlobK2KvzFYHTk-w7vtfhZ0j96UkjaBhVjYSMi4hf43xNbB4xJoHhHLESABLp9IYDlnzBeBXKumXDO5aRk3sFAEAWxj57Ec_DyK6UwXSR9Xqji5a1lEArUdFPYzVZ_YCec","e":"AQAB","alg":"RS256","use":"sig","kid":"194"},{"kty":"RSA","n":"5SGw1jcqyFYEZaf39RoxAhlq-hfRSOsneVtsT2k09yEQhwB2myvf3ckVAwFyBF6y0Hr1psvu1FlPzKQ9YfcQkfge4e7eeQ7uaez9mMQ8RpyAFZprq1iFCix4XQw-jKW47LAevr9w1ttZY932gFrGJ4gkf_uqutUny82vupVUETpQ6HDmIL958SxYb_-d436zi5LMlHnTxcR5TWIQGGxip-CrD7vOA3hrssYLhNGQdwVYtwI768EvwE8h4VJDgIrovoHPH1ofDQk8-oG20eEmZeWugI1K3z33fZJS-E_2p_OiDVr0EmgFMTvPTnQ75h_9vyF1qhzikJpN9P8KcEm8oGu7KJGIn8ggUY0ftqKG2KcWTaKiirFFYQ981PhLHryH18eOIxMpoh9pRXf2y7DfNTyid99ig0GUH-lzAlbKY0EV2sIuvEsIoo6G8YT2uI72xzl7sCcp41FS7oFwbUyHp_uHGiTZgN7g-18nm2TFmQ_wGB1xCwJMFzjIXq1PwEjmg3W5NBuMLSbG-aDwjeNrcD_4vfB6yg548GztQO2MpV_BuxtrZDJQm-xhJXdm4FfrJzWdwX_JN9qfsP0YU1_mxtSU_m6EKgmwFdE3Yh1WM0-kRRSk3gmNvXpiKeVduzm8I5_Jl7kwLgBw24QUVaLZn8jC2xWRk_jcBNFFLQgOf9U","e":"AQAB","alg":"RS256","use":"sig","kid":"196"},{"kty":"RSA","n":"o8Fz0jXjZ0Rz5Kt2TmzP0xVokf-Q4Az-MQg5i5MCxNNTQiZp7VkwAZeM0mJ-mKDbCzPm9ws43v8cxeiIkVZQqrAocnnb90MDCnU-7oD7MvOU4SbmhuLzVCyVZPIBRq5z0OgjcwLeD4trOoogkLOu0kyuyzNoFkr712m_GZ1xic-X0MlFKq3-2cI4U2nEuuh-Xcy7bUqCx0zTJFPOOKghGYEZZ6biZ04VC-ERcW6cC19pEWm6vCqZJEsKPCfazVAoHKZAukNd0XLPQd_W6xAaGnp8e7a5tFHn6dU6ikhI94ZieVp6WItWsQTDwJH-D7bVpVRG-lWL74lgcuQdFAtldm__k7FvlTXdqiLrd0rYuDnTFiwUSsUXWBJbmGVsEOylZVPQAL-K7G7p3BRY4X26vOgfludwCOj7L7WFbd0IXziTm74xe2KZGKsFpoCjJI0z_D5Oe5bofswr1Ceafhl97suG7OoInobt7QAQnnLcBVzUPz_TflOXDc5UiePptA0bxdd8MVENiDbTGGNz6DCzfL986QfcJLPB8aZa3lFN0kWPBkOclZagL4WpyIllB6euvZ2hfpt8IY2_bmUN06luo6N7Fy0hSSFMWvfzaD8_Ff3czb1Kv-b0xI6Ugk4d67RNNSbTcRM2Muvx-dJgOyXqrc_hE96OOqcMjrGZJoXnCAM","e":"AQAB","alg":"RS256","use":"sig","kid":"190"},{"kty":"RSA","n":"nOcQOvHV8rc-hcfP_RmxMGjyVlruSLeFXTojYcbixaAH36scUejjaws31orUjmYqB5isE9ntdsL4DnsdP_MDJ2mtYD2FIh8tBkJjgXitjdcDclrwELAx846wBIlSES8wR6czpdJZfSwhL_92EGpDH6z7lKEClqhDlbtZ-yFKFj9BQRwaEXWV7uuq23gxXOqyEN0WXl3ZJPgsodCnlXRn9y_r5CNV9V4wvzXGlJhT3Nv_N_Z5XNZIjZnHdCuE_itT4a1xENEEds7Jjg5mRTlVFzYv5iQtBo7jdY5ogMTgKPmRh6hYuqLeki3AOAUff1AGaN9TZH60UxwTw03-DQJL5C2SuC_vM5KIWxZxQniubfegUCBXpJSAJbLt8zSFztTcrLS4-wgUHo1A8TDNaO28_KsBUTWsrieOr3NfCn4bPNb7t8G90U60lW0GIhEda3fNYnV0WWpZVO1jCRNy_JYUs3ECo0E1ZQJZD72Dm6UjiuH7eR3ZgNKR9tlLNdyZSpZUZPErLrXJ90d5XbmJYvRX9r93z6GQqOv5FQy1JhatwefxhKdyhkDEHsqELO0XDqnDnmgxkEEU-lHYSVGz-iDlUZOUYTTCtxsPDmBIXOMuwp0UydJphO36qRQaDyEjHNsYKLj5KVvjDHS8Gw1FhbFvsoUrBHre4hLY9Pa5meatV_k","e":"AQAB","alg":"RS256","use":"sig","kid":"192"}]}'; // jshint ignore:line

    // salesforce openid config
    var salesForceOpenIdConfig = {
        issuer: 'https://login.salesforce.com',
        authorization_endpoint: 'https://login.salesforce.com/services/oauth2/authorize',
        token_endpoint: 'https://login.salesforce.com/services/oauth2/token',
        userinfo_endpoint: 'https://login.salesforce.com/services/oauth2/userinfo',
        revocation_endpoint: 'https://login.salesforce.com/services/oauth2/revoke',
        jwks_uri: 'https://login.salesforce.com/id/keys',
        redirect_uri: 'http://localhost:8000/demoApp/callback.html',
        keys: salesforceKeys
    };




})();